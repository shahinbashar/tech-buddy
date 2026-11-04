import { ApiPropertyOptional } from '@nestjs/swagger';
import { PreparationGoal } from '@prisma/client';
import {
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { BD_PHONE_RULE } from '../../auth/dto/register.dto';
import { Trim, TrimToNull } from '../../../common/dto/transforms';

export class UpdateProfileDto {
  @ApiPropertyOptional()
  @Trim()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @IsOptional()
  fullName?: string;

  @ApiPropertyOptional({ nullable: true, description: 'Send null or empty string to clear' })
  @TrimToNull()
  @ValidateIf((_, value) => value !== null)
  @IsString()
  @Matches(BD_PHONE_RULE, { message: 'Enter a valid Bangladeshi mobile number' })
  @IsOptional()
  phone?: string | null;

  @ApiPropertyOptional({ enum: PreparationGoal })
  @IsEnum(PreparationGoal)
  @IsOptional()
  preparationGoal?: PreparationGoal;
}
