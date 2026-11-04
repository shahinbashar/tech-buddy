import { HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { mapPrismaError } from './prisma-exception.filter';

const error = (code: string, meta?: Record<string, unknown>) =>
  new Prisma.PrismaClientKnownRequestError('db error', { code, clientVersion: 'test', meta });

describe('mapPrismaError', () => {
  it('maps unique violations to 409 with the field name', () => {
    expect(mapPrismaError(error('P2002', { target: ['email'] }))).toEqual({
      status: HttpStatus.CONFLICT,
      message: 'A record with this email already exists',
    });
  });

  it('maps FK violations to 409 and missing records to 404', () => {
    expect(mapPrismaError(error('P2003')).status).toBe(HttpStatus.CONFLICT);
    expect(mapPrismaError(error('P2025')).status).toBe(HttpStatus.NOT_FOUND);
  });

  it('falls back to 500 for unknown codes', () => {
    expect(mapPrismaError(error('P9999')).status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
