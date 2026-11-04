import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { UploadsService } from './uploads.service';

const fileBody = {
  schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } },
};

@ApiTags('admin / attachments')
@ApiBearerAuth()
@Roles('ADMIN')
@Controller('admin')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody(fileBody)
  @UseInterceptors(FileInterceptor('file'))
  @Post('circulars/:id/attachments')
  attachToCircular(@Param('id') id: string, @UploadedFile() file?: Express.Multer.File) {
    return this.uploadsService.attach(file, { circularId: id });
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody(fileBody)
  @UseInterceptors(FileInterceptor('file'))
  @Post('notes/:id/attachments')
  attachToNote(@Param('id') id: string, @UploadedFile() file?: Express.Multer.File) {
    return this.uploadsService.attach(file, { noteId: id });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('attachments/:id')
  remove(@Param('id') id: string) {
    return this.uploadsService.remove(id);
  }
}
