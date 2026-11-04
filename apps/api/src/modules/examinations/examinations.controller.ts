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
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { type AuthUser } from '../../common/types/auth-user';
import { AttemptsService } from './attempts.service';
import {
  CreateExamDto,
  ExamSettingsDto,
  QuestionSelectionDto,
  SaveAnswerDto,
  SubmitAttemptDto,
  UpdateExamDto,
} from './dto/exam.dto';
import { ExamsAdminService } from './exams-admin.service';
import { ExamsService } from './exams.service';
import { CreatePracticeDto } from './dto/practice.dto';
import { PracticeService } from './practice.service';

@ApiTags('exams')
@ApiBearerAuth()
@Controller('exams')
export class ExamsController {
  constructor(
    private readonly examsService: ExamsService,
    private readonly attemptsService: AttemptsService,
  ) {}

  @Get('today')
  today(@CurrentUser() user: AuthUser) {
    return this.examsService.today(user);
  }

  @Get()
  list(@CurrentUser() user: AuthUser, @Query() query: PaginationQueryDto) {
    return this.examsService.list(user, query);
  }

  @Get(':id')
  findOne(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.examsService.findOne(user, id);
  }

  @Get(':id/leaderboard')
  leaderboard(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.examsService.leaderboard(user, id);
  }

  @Post(':id/attempts')
  start(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.attemptsService.start(user, id);
  }
}

@ApiTags('practice')
@ApiBearerAuth()
@Controller('practice')
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {}

  /** Past papers available as practice sources, with how many questions the user can draw. */
  @Get('sources')
  sources(@CurrentUser() user: AuthUser) {
    return this.practiceService.sources(user);
  }

  /** Creates a personal practice set and starts it; returns the attempt to open. */
  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreatePracticeDto) {
    return this.practiceService.create(user, dto);
  }
}

@ApiTags('exam attempts')
@ApiBearerAuth()
@Controller('attempts')
export class AttemptsController {
  constructor(private readonly attemptsService: AttemptsService) {}

  @Get()
  history(@CurrentUser() user: AuthUser, @Query() query: PaginationQueryDto) {
    return this.attemptsService.history(user.id, query);
  }

  @Get(':id')
  view(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.attemptsService.view(user.id, id);
  }

  @Put(':id/answers')
  saveAnswer(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() dto: SaveAnswerDto) {
    return this.attemptsService.saveAnswer(user.id, id, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post(':id/submit')
  submit(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() dto: SubmitAttemptDto) {
    return this.attemptsService.submit(user.id, id, dto.answers);
  }
}

@ApiTags('admin / exams')
@ApiBearerAuth()
@Roles('ADMIN')
@Controller('admin/exams')
export class AdminExamsController {
  constructor(private readonly examsAdminService: ExamsAdminService) {}

  @Get('settings')
  getSettings() {
    return this.examsAdminService.getSettings();
  }

  @Put('settings')
  updateSettings(@Body() dto: ExamSettingsDto) {
    return this.examsAdminService.updateSettings(dto);
  }

  @Get()
  list(@Query() query: PaginationQueryDto) {
    return this.examsAdminService.list(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examsAdminService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateExamDto) {
    return this.examsAdminService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateExamDto) {
    return this.examsAdminService.update(id, dto);
  }

  @Put(':id/questions')
  replaceQuestions(@Param('id') id: string, @Body() dto: QuestionSelectionDto) {
    return this.examsAdminService.replaceQuestions(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examsAdminService.remove(id);
  }
}
