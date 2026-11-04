import { Module } from '@nestjs/common';
import { AdminCircularsController, CircularsController } from './circulars.controller';
import { CircularsService } from './circulars.service';

@Module({
  controllers: [CircularsController, AdminCircularsController],
  providers: [CircularsService],
})
export class CircularsModule {}
