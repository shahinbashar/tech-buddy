import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { Trim } from '../../../common/dto/transforms';

export const PRACTICE_MODES = ['random', 'mistakes'] as const;
export type PracticeMode = (typeof PRACTICE_MODES)[number];

export class CreatePracticeDto {
  @ApiPropertyOptional({
    enum: PRACTICE_MODES,
    default: 'random',
    description: '`mistakes` = questions you answered wrong before',
  })
  @IsIn(PRACTICE_MODES)
  @IsOptional()
  mode: PracticeMode = 'random';

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  subjectId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  topicId?: string;

  @ApiPropertyOptional({
    description: 'Past paper to draw from — a `reference` listed by `GET /practice/sources`',
  })
  @Trim()
  @IsString()
  @MaxLength(500)
  @IsOptional()
  reference?: string;

  @ApiPropertyOptional({ minimum: 5, maximum: 50, default: 10 })
  @IsInt()
  @Min(5)
  @Max(50)
  @IsOptional()
  questionCount = 10;
}
