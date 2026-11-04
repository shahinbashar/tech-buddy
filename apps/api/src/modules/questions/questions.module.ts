import { Module } from '@nestjs/common';
import { AdminQuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
  controllers: [AdminQuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
