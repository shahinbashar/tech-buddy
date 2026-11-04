import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { type AuthUser } from '../../common/types/auth-user';
import { ProgressService } from './progress.service';

@ApiTags('progress')
@ApiBearerAuth()
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get('topics')
  overview(@CurrentUser() user: AuthUser) {
    return this.progressService.overview(user.id);
  }

  @Post('topics/:topicId/complete')
  complete(@CurrentUser() user: AuthUser, @Param('topicId') topicId: string) {
    return this.progressService.markComplete(user, topicId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('topics/:topicId/complete')
  uncomplete(@CurrentUser() user: AuthUser, @Param('topicId') topicId: string) {
    return this.progressService.unmarkComplete(user.id, topicId);
  }
}
