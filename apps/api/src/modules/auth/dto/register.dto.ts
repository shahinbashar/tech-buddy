import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { NormalizeEmail, Trim } from '../../../common/dto/transforms';

export const PASSWORD_RULE = /^(?=.*[A-Za-z])(?=.*\d).{8,72}$/;
export const PASSWORD_MESSAGE =
  'Password must be 8–72 characters and contain at least one letter and one number';
export const BD_PHONE_RULE = /^(?:\+?88)?01[3-9]\d{8}$/;

export class RegisterDto {
  @ApiProperty({ example: 'Rahim Uddin' })
  @Trim()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  fullName: string;

  @ApiProperty({ example: 'rahim@example.com' })
  @NormalizeEmail()
  @IsEmail()
  @MaxLength(254)
  email: string;

  @ApiProperty({ example: 'Secret123' })
  @IsString()
  @Matches(PASSWORD_RULE, { message: PASSWORD_MESSAGE })
  password: string;

  @ApiPropertyOptional({ example: '01712345678' })
  @IsString()
  @Matches(BD_PHONE_RULE, { message: 'Enter a valid Bangladeshi mobile number' })
  @IsOptional()
  phone?: string;
}
