import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { type JobCircular, type Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { endOfDhakaDay } from '../../common/utils/dhaka-time';
import { DAY_MS } from '../../common/utils/time';
import { paginate, toSkipTake } from '../../common/utils/pagination';
import { uniqueSlug } from '../../common/utils/slug';
import { UploadsService } from '../uploads/uploads.service';
import { circularStatus } from './circular-status';
import { type CreateCircularDto, type UpdateCircularDto } from './dto/circular.dto';
import {
  type AdminListCircularsQueryDto,
  type ListCircularsQueryDto,
} from './dto/list-circulars.dto';

const attachmentSelect = {
  id: true,
  originalName: true,
  mimeType: true,
  size: true,
  url: true,
} satisfies Prisma.AttachmentSelect;

const listSelect = {
  id: true,
  slug: true,
  organizationName: true,
  organizationNameBn: true,
  title: true,
  category: true,
  jobType: true,
  employmentType: true,
  publishedDate: true,
  applicationStartDate: true,
  applicationDeadline: true,
  vacancies: true,
  salary: true,
  isFeatured: true,
  isPublished: true,
} satisfies Prisma.JobCircularSelect;

type CircularDates = Pick<
  JobCircular,
  'isPublished' | 'applicationStartDate' | 'applicationDeadline'
>;

function withStatus<T extends CircularDates>(circular: T, now: Date) {
  return { ...circular, status: circularStatus(circular, now) };
}

@Injectable()
export class CircularsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploads: UploadsService,
  ) {}

  // ─────────────── Public ───────────────

  async listPublic(query: ListCircularsQueryDto) {
    return this.list(query, { isPublished: true });
  }

  async summary() {
    const now = new Date();
    const [running, archived, closingSoon] = await this.prisma.$transaction([
      this.prisma.jobCircular.count({
        where: { isPublished: true, applicationDeadline: { gte: now } },
      }),
      this.prisma.jobCircular.count({
        where: { isPublished: true, applicationDeadline: { lt: now } },
      }),
      this.prisma.jobCircular.count({
        where: {
          isPublished: true,
          applicationDeadline: { gte: now, lte: new Date(now.getTime() + 7 * DAY_MS) },
        },
      }),
    ]);
    return { running, archived, closingSoon };
  }

  async findPublicBySlug(slug: string) {
    const circular = await this.prisma.jobCircular.findFirst({
      where: { slug, isPublished: true },
      include: { attachments: { select: attachmentSelect, orderBy: { createdAt: 'asc' } } },
    });
    if (!circular) throw new NotFoundException('Circular not found');
    return withStatus(circular, new Date());
  }

  // ─────────────── Admin ───────────────

  async listAdmin(query: AdminListCircularsQueryDto) {
    return this.list(query, query.published === undefined ? {} : { isPublished: query.published });
  }

  async findById(id: string) {
    const circular = await this.prisma.jobCircular.findUnique({
      where: { id },
      include: { attachments: { select: attachmentSelect, orderBy: { createdAt: 'asc' } } },
    });
    if (!circular) throw new NotFoundException('Circular not found');
    return withStatus(circular, new Date());
  }

  async create(dto: CreateCircularDto) {
    this.assertDateOrder(dto.applicationStartDate, dto.applicationDeadline);
    const circular = await this.prisma.jobCircular.create({
      data: { ...dto, slug: uniqueSlug(`${dto.organizationName} ${dto.title}`) },
    });
    return this.findById(circular.id);
  }

  async update(id: string, dto: UpdateCircularDto) {
    const existing = await this.prisma.jobCircular.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Circular not found');
    this.assertDateOrder(
      dto.applicationStartDate ?? existing.applicationStartDate,
      dto.applicationDeadline ?? existing.applicationDeadline,
    );
    await this.prisma.jobCircular.update({ where: { id }, data: dto });
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const circular = await this.prisma.jobCircular.findUnique({
      where: { id },
      select: { attachments: { select: { fileName: true } } },
    });
    if (!circular) throw new NotFoundException('Circular not found');
    await this.prisma.jobCircular.delete({ where: { id } });
    await this.uploads.removeFiles(circular.attachments.map((a) => a.fileName));
  }

  // ─────────────── Shared ───────────────

  private async list(query: ListCircularsQueryDto, base: Prisma.JobCircularWhereInput) {
    const now = new Date();
    const where: Prisma.JobCircularWhereInput = { ...base, AND: [] };
    const and = where.AND as Prisma.JobCircularWhereInput[];

    if (query.status === 'running') and.push({ applicationDeadline: { gte: now } });
    if (query.status === 'archived') and.push({ applicationDeadline: { lt: now } });
    if (query.deadline) {
      const until =
        query.deadline === 'today'
          ? endOfDhakaDay(now)
          : new Date(now.getTime() + (query.deadline === 'week' ? 7 : 30) * DAY_MS);
      and.push({ applicationDeadline: { gte: now, lte: until } });
    }
    if (query.category) and.push({ category: query.category });
    if (query.jobType) and.push({ jobType: query.jobType });
    if (query.featured !== undefined) and.push({ isFeatured: query.featured });
    if (query.search) {
      and.push({
        OR: [
          { organizationName: { contains: query.search, mode: 'insensitive' } },
          { organizationNameBn: { contains: query.search, mode: 'insensitive' } },
          { title: { contains: query.search, mode: 'insensitive' } },
        ],
      });
    }

    const orderBy: Prisma.JobCircularOrderByWithRelationInput[] =
      query.status === 'running'
        ? [{ isFeatured: 'desc' }, { applicationDeadline: 'asc' }]
        : query.status === 'archived'
          ? [{ applicationDeadline: 'desc' }]
          : [{ createdAt: 'desc' }];

    const [items, total] = await this.prisma.$transaction([
      this.prisma.jobCircular.findMany({
        where,
        select: listSelect,
        orderBy,
        ...toSkipTake(query.page, query.pageSize),
      }),
      this.prisma.jobCircular.count({ where }),
    ]);
    return paginate(
      items.map((c) => withStatus(c, now)),
      total,
      query.page,
      query.pageSize,
    );
  }

  private assertDateOrder(start: string | Date, deadline: string | Date): void {
    if (new Date(start) > new Date(deadline)) {
      throw new BadRequestException('Application start date must be before the deadline');
    }
  }
}
