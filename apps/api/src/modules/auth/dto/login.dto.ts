import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { NormalizeEmail } from '../../../common/dto/transforms';

export class LoginDto {
  @ApiProperty({ example: 'admin@example.com' })
  @NormalizeEmail()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(72)
  password: string;
}
