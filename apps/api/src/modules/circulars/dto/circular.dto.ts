import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CircularCategory, EmploymentType, JobType } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Trim, TrimToNull } from '../../../common/dto/transforms';

export class CreateCircularDto {
  @ApiProperty({ example: 'Bangladesh Computer Council' })
  @Trim()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  organizationName: string;

  @ApiPropertyOptional({ example: 'বাংলাদেশ কম্পিউটার কাউন্সিল' })
  @TrimToNull()
  @IsString()
  @MaxLength(200)
  @IsOptional()
  organizationNameBn?: string | null;

  @ApiProperty({ example: 'Assistant Programmer' })
  @Trim()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  title: string;

  @ApiProperty({ enum: CircularCategory })
  @IsEnum(CircularCategory)
  category: CircularCategory;

  @ApiProperty({ enum: JobType })
  @IsEnum(JobType)
  jobType: JobType;

  @ApiProperty({ enum: EmploymentType })
  @IsEnum(EmploymentType)
  employmentType: EmploymentType;

  @ApiProperty({ example: '2026-11-01T00:00:00+06:00' })
  @IsDateString()
  publishedDate: string;

  @ApiProperty({ example: '2026-11-05T10:00:00+06:00' })
  @IsDateString()
  applicationStartDate: string;

  @ApiProperty({ example: '2026-11-30T17:00:00+06:00' })
  @IsDateString()
  applicationDeadline: string;

  @ApiPropertyOptional({ example: 12 })
  @IsInt()
  @Min(0)
  @IsOptional()
  vacancies?: number | null;

  @ApiPropertyOptional({ example: 'Grade 9 (৳22,000–53,060)' })
  @TrimToNull()
  @IsString()
  @MaxLength(200)
  @IsOptional()
  salary?: string | null;

  @ApiPropertyOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(5000)
  @IsOptional()
  educationalQualification?: string | null;

  @ApiPropertyOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  ageRequirement?: string | null;

  @ApiPropertyOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(10000)
  @IsOptional()
  additionalRequirements?: string | null;

  @ApiPropertyOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(10000)
  @IsOptional()
  applicationInstructions?: string | null;

  @ApiPropertyOptional({ example: 'https://bcc.teletalk.com.bd' })
  @TrimToNull()
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  @MaxLength(500)
  @IsOptional()
  applicationUrl?: string | null;

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}

export class UpdateCircularDto extends PartialType(CreateCircularDto) {}
