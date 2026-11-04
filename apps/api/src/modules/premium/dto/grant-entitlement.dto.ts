import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class GrantEntitlementDto {
  @ApiProperty({ description: 'User receiving premium access' })
  @IsString()
  userId: string;

  @ApiPropertyOptional({ description: 'Plan used to compute expiry when expiresAt is omitted' })
  @IsString()
  @IsOptional()
  planId?: string;

  @ApiPropertyOptional({ description: 'Defaults to now' })
  @IsDateString()
  @IsOptional()
  startsAt?: string;

  @ApiPropertyOptional({
    description: 'Explicit expiry; omit with no plan (or a lifetime plan) for no expiry',
  })
  @IsDateString()
  @IsOptional()
  expiresAt?: string;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(500)
  @IsOptional()
  note?: string;
}
