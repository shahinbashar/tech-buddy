import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { type AuthUser } from '../../common/types/auth-user';
import {
  CreateTopicDto,
  ListTopicsQueryDto,
  TopicOptionsQueryDto,
  UpdateTopicDto,
} from './dto/topic.dto';
import { TopicsService } from './topics.service';

@ApiTags('topics')
@Controller('subjects/:subjectSlug/topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Public()
  @Get(':topicSlug')
  findOne(
    @Param('subjectSlug') subjectSlug: string,
    @Param('topicSlug') topicSlug: string,
    @CurrentUser() user?: AuthUser,
  ) {
    return this.topicsService.findPublic(subjectSlug, topicSlug, user);
  }
}

@ApiTags('admin / topics')
@ApiBearerAuth()
@Roles('ADMIN')
@Controller('admin/topics')
export class AdminTopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  list(@Query() query: ListTopicsQueryDto) {
    return this.topicsService.listAdmin(query);
  }

  @Get('options')
  options(@Query() query: TopicOptionsQueryDto) {
    return this.topicsService.options(query.subjectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicsService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateTopicDto) {
    return this.topicsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTopicDto) {
    return this.topicsService.update(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicsService.remove(id);
  }
}
