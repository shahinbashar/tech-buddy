import { ApiPropertyOptional } from '@nestjs/swagger';
import { CircularCategory, JobType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsIn, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../../common/dto/pagination.dto';

export const CIRCULAR_STATUS_FILTERS = ['running', 'archived', 'all'] as const;
export const DEADLINE_FILTERS = ['today', 'week', 'month'] as const;

export class ListCircularsQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: CIRCULAR_STATUS_FILTERS, default: 'running' })
  @IsIn(CIRCULAR_STATUS_FILTERS)
  @IsOptional()
  status: (typeof CIRCULAR_STATUS_FILTERS)[number] = 'running';

  @ApiPropertyOptional({ enum: CircularCategory })
  @IsEnum(CircularCategory)
  @IsOptional()
  category?: CircularCategory;

  @ApiPropertyOptional({ enum: JobType })
  @IsEnum(JobType)
  @IsOptional()
  jobType?: JobType;

  @ApiPropertyOptional({ enum: DEADLINE_FILTERS, description: 'Running circulars closing within…' })
  @IsIn(DEADLINE_FILTERS)
  @IsOptional()
  deadline?: (typeof DEADLINE_FILTERS)[number];

  @ApiPropertyOptional()
  @Transform(({ value }: { value: unknown }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  @IsBoolean()
  @IsOptional()
  featured?: boolean;
}

export class AdminListCircularsQueryDto extends ListCircularsQueryDto {
  @ApiPropertyOptional({ enum: CIRCULAR_STATUS_FILTERS, default: 'all' })
  @IsIn(CIRCULAR_STATUS_FILTERS)
  @IsOptional()
  override status: (typeof CIRCULAR_STATUS_FILTERS)[number] = 'all';

  @ApiPropertyOptional()
  @Transform(({ value }: { value: unknown }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
