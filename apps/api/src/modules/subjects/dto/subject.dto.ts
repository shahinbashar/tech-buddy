import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { SubjectCategory } from '@prisma/client';
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
import { Trim, TrimToNull } from '../../../common/dto/transforms';

export class CreateSubjectDto {
  @ApiProperty({ example: 'Computer Science' })
  @Trim()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ example: 'কম্পিউটার বিজ্ঞান' })
  @TrimToNull()
  @IsString()
  @MaxLength(100)
  @IsOptional()
  nameBn?: string | null;

  @ApiPropertyOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  description?: string | null;

  @ApiProperty({ enum: SubjectCategory })
  @IsEnum(SubjectCategory)
  category: SubjectCategory;

  @ApiPropertyOptional({ default: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {}
