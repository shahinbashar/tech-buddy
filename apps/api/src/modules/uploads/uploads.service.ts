import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type Attachment } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';
import { PrismaService } from '../../prisma/prisma.service';
import { type AppConfig } from '../../config/env.validation';
import { type AllowedMimeType, extensionFor, validateUpload } from './file-validation';

type AttachmentOwner = { circularId: string } | { noteId: string };

@Injectable()
export class UploadsService {
  private readonly logger = new Logger(UploadsService.name);
  private readonly uploadDir: string;

  constructor(
    private readonly prisma: PrismaService,
    config: ConfigService<AppConfig, true>,
  ) {
    this.uploadDir = resolve(config.get('UPLOAD_DIR', { infer: true }));
  }

  async attach(file: Express.Multer.File | undefined, owner: AttachmentOwner): Promise<Attachment> {
    if (!file) throw new BadRequestException('A file is required (form field "file")');
    const error = validateUpload(file);
    if (error) throw new BadRequestException(error);

    await this.assertOwnerExists(owner);
    const fileName = `${randomUUID()}${extensionFor(file.mimetype as AllowedMimeType)}`;
    await mkdir(this.uploadDir, { recursive: true });
    await writeFile(join(this.uploadDir, fileName), file.buffer);

    try {
      return await this.prisma.attachment.create({
        data: {
          ...owner,
          fileName,
          originalName: basename(file.originalname).slice(0, 255),
          mimeType: file.mimetype,
          size: file.size,
          url: `/uploads/${fileName}`,
        },
      });
    } catch (dbError) {
      await this.removeFiles([fileName]);
      throw dbError;
    }
  }

  async remove(id: string): Promise<void> {
    const attachment = await this.prisma.attachment.findUnique({ where: { id } });
    if (!attachment) throw new NotFoundException('Attachment not found');
    await this.prisma.attachment.delete({ where: { id } });
    await this.removeFiles([attachment.fileName]);
  }

  /** Best-effort file cleanup (rows are removed by FK cascade). Missing files are ignored. */
  async removeFiles(fileNames: string[]): Promise<void> {
    await Promise.all(
      fileNames.map(async (name) => {
        try {
          await unlink(join(this.uploadDir, basename(name)));
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
            this.logger.warn(`Could not delete upload ${name}: ${(error as Error).message}`);
          }
        }
      }),
    );
  }

  private async assertOwnerExists(owner: AttachmentOwner): Promise<void> {
    const exists =
      'circularId' in owner
        ? await this.prisma.jobCircular.count({ where: { id: owner.circularId } })
        : await this.prisma.note.count({ where: { id: owner.noteId } });
    if (!exists)
      throw new NotFoundException('circularId' in owner ? 'Circular not found' : 'Note not found');
  }
}
