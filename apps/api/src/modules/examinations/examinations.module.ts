import { Module } from '@nestjs/common';
import { AttemptsService } from './attempts.service';
import {
  AdminExamsController,
  AttemptsController,
  ExamsController,
  PracticeController,
} from './examinations.controller';
import { ExamGeneratorService } from './exam-generator.service';
import { ExamsAdminService } from './exams-admin.service';
import { ExamsService } from './exams.service';
import { PracticeService } from './practice.service';

@Module({
  controllers: [ExamsController, AttemptsController, PracticeController, AdminExamsController],
  providers: [
    ExamsService,
    ExamsAdminService,
    AttemptsService,
    ExamGeneratorService,
    PracticeService,
  ],
})
export class ExaminationsModule {}
