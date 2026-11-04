import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { AccessLevel } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { PaginationQueryDto } from '../../../common/dto/pagination.dto';
import { Trim, TrimToNull } from '../../../common/dto/transforms';

export class CreateNoteDto {
  @ApiProperty()
  @IsString()
  topicId: string;

  @ApiProperty({ example: 'De Morgan’s theorem explained' })
  @Trim()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  title: string;

  @ApiPropertyOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(500)
  @IsOptional()
  summary?: string | null;

  @ApiProperty({ description: 'Markdown content' })
  @IsString()
  @MinLength(1)
  @MaxLength(200_000)
  content: string;

  @ApiPropertyOptional({ enum: AccessLevel, default: AccessLevel.FREE })
  @IsEnum(AccessLevel)
  @IsOptional()
  accessLevel?: AccessLevel;

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;
}

export class UpdateNoteDto extends PartialType(CreateNoteDto) {}

export class ListNotesQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  subjectId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  topicId?: string;
}
