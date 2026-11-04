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

export class CreateTopicDto {
  @ApiProperty()
  @IsString()
  subjectId: string;

  @ApiPropertyOptional({ description: 'Parent topic id (makes this a subtopic)', nullable: true })
  @TrimToNull()
  @IsString()
  @IsOptional()
  parentId?: string | null;

  @ApiProperty({ example: 'Boolean Algebra' })
  @Trim()
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  title: string;

  @ApiPropertyOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  description?: string | null;

  @ApiPropertyOptional({ description: 'Markdown overview' })
  @TrimToNull()
  @IsString()
  @MaxLength(100_000)
  @IsOptional()
  content?: string | null;

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

export class UpdateTopicDto extends PartialType(CreateTopicDto) {}

export class ListTopicsQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  subjectId?: string;
}

export class TopicOptionsQueryDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  subjectId?: string;
}
