import { Module } from '@nestjs/common';
import { AdminTopicsController, TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';

@Module({
  controllers: [TopicsController, AdminTopicsController],
  providers: [TopicsService],
})
export class TopicsModule {}
