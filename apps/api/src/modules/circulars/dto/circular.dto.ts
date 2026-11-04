import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CircularCategory, EmploymentType, JobType } from '@prisma/client';
import { Transform } from 'class-transformer';
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

const trim = ({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value);
const emptyToNull = ({ value }: { value: unknown }) =>
  typeof value === 'string' && value.trim() === ''
    ? null
    : typeof value === 'string'
      ? value.trim()
      : value;

export class CreateCircularDto {
  @ApiProperty({ example: 'Bangladesh Computer Council' })
  @Transform(trim)
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  organizationName: string;

  @ApiPropertyOptional({ example: 'বাংলাদেশ কম্পিউটার কাউন্সিল' })
  @Transform(emptyToNull)
  @IsString()
  @MaxLength(200)
  @IsOptional()
  organizationNameBn?: string | null;

  @ApiProperty({ example: 'Assistant Programmer' })
  @Transform(trim)
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
  @Transform(emptyToNull)
  @IsString()
  @MaxLength(200)
  @IsOptional()
  salary?: string | null;

  @ApiPropertyOptional()
  @Transform(emptyToNull)
  @IsString()
  @MaxLength(5000)
  @IsOptional()
  educationalQualification?: string | null;

  @ApiPropertyOptional()
  @Transform(emptyToNull)
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  ageRequirement?: string | null;

  @ApiPropertyOptional()
  @Transform(emptyToNull)
  @IsString()
  @MaxLength(10000)
  @IsOptional()
  additionalRequirements?: string | null;

  @ApiPropertyOptional()
  @Transform(emptyToNull)
  @IsString()
  @MaxLength(10000)
  @IsOptional()
  applicationInstructions?: string | null;

  @ApiPropertyOptional({ example: 'https://bcc.teletalk.com.bd' })
  @Transform(emptyToNull)
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
