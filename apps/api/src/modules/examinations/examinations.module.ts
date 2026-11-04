import { Module } from '@nestjs/common';
import { AttemptsService } from './attempts.service';
import {
  AdminExamsController,
  AttemptsController,
  ExamsController,
} from './examinations.controller';
import { ExamGeneratorService } from './exam-generator.service';
import { ExamsAdminService } from './exams-admin.service';
import { ExamsService } from './exams.service';

@Module({
  controllers: [ExamsController, AttemptsController, AdminExamsController],
  providers: [ExamsService, ExamsAdminService, AttemptsService, ExamGeneratorService],
})
export class ExaminationsModule {}
