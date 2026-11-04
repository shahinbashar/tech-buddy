import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { type Response } from 'express';

interface MappedError {
  status: HttpStatus;
  message: string;
}

/** Central mapping from Prisma errors to HTTP responses. */
export function mapPrismaError(error: Prisma.PrismaClientKnownRequestError): MappedError {
  switch (error.code) {
    case 'P2002': {
      const target = (error.meta?.target as string[] | string | undefined) ?? 'field';
      const fields = Array.isArray(target) ? target.join(', ') : target;
      return {
        status: HttpStatus.CONFLICT,
        message: `A record with this ${fields} already exists`,
      };
    }
    case 'P2003':
    case 'P2014':
      return {
        status: HttpStatus.CONFLICT,
        message: 'This record is referenced by other data and cannot be changed or deleted',
      };
    case 'P2025':
      return { status: HttpStatus.NOT_FOUND, message: 'Record not found' };
    default:
      return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Unexpected database error' };
  }
}

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const { status, message } = mapPrismaError(exception);
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(`Prisma error ${exception.code}: ${exception.message}`, exception.stack);
    }
    response.status(status).json({ statusCode: status, message, error: HttpStatus[status] });
  }
}
