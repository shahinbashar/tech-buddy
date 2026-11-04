import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { AccessLevel, Difficulty } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PaginationQueryDto } from '../../../common/dto/pagination.dto';

export const OPTIONS_PER_QUESTION = 4;

const trim = ({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value);
const trimOrNull = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() || null : value;
const toBool = ({ value }: { value: unknown }) =>
  value === 'true' ? true : value === 'false' ? false : value;

export class QuestionOptionInputDto {
  @ApiProperty()
  @Transform(trim)
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  text: string;

  @ApiPropertyOptional()
  @Transform(trimOrNull)
  @IsString()
  @MaxLength(500)
  @IsOptional()
  textBn?: string | null;
}

export class CreateQuestionDto {
  @ApiProperty()
  @IsString()
  subjectId: string;

  @ApiPropertyOptional({ nullable: true })
  @Transform(trimOrNull)
  @IsString()
  @IsOptional()
  topicId?: string | null;

  @ApiProperty()
  @Transform(trim)
  @IsString()
  @MinLength(3)
  @MaxLength(2000)
  text: string;

  @ApiPropertyOptional()
  @Transform(trimOrNull)
  @IsString()
  @MaxLength(2000)
  @IsOptional()
  textBn?: string | null;

  @ApiProperty({ enum: Difficulty })
  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @ApiProperty({ type: [QuestionOptionInputDto], minItems: 4, maxItems: 4 })
  @IsArray()
  @ArrayMinSize(OPTIONS_PER_QUESTION)
  @ArrayMaxSize(OPTIONS_PER_QUESTION)
  @ValidateNested({ each: true })
  @Type(() => QuestionOptionInputDto)
  options: QuestionOptionInputDto[];

  @ApiProperty({ minimum: 0, maximum: 3, description: 'Index of the correct option' })
  @IsInt()
  @Min(0)
  @Max(OPTIONS_PER_QUESTION - 1)
  correctOptionIndex: number;

  @ApiProperty()
  @Transform(trim)
  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  explanation: string;

  @ApiPropertyOptional()
  @Transform(trimOrNull)
  @IsString()
  @MaxLength(500)
  @IsOptional()
  reference?: string | null;

  @ApiPropertyOptional({ enum: AccessLevel, default: AccessLevel.FREE })
  @IsEnum(AccessLevel)
  @IsOptional()
  accessLevel?: AccessLevel;

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}

export class ListQuestionsQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  subjectId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  topicId?: string;

  @ApiPropertyOptional({ enum: Difficulty })
  @IsEnum(Difficulty)
  @IsOptional()
  difficulty?: Difficulty;

  @ApiPropertyOptional({ enum: AccessLevel })
  @IsEnum(AccessLevel)
  @IsOptional()
  accessLevel?: AccessLevel;

  @ApiPropertyOptional()
  @Transform(toBool)
  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
