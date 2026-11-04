import { Global, Module } from '@nestjs/common';
import { PremiumAccessService } from './premium-access.service';
import { PremiumController } from './premium.controller';
import { PremiumService } from './premium.service';

@Global()
@Module({
  controllers: [PremiumController],
  providers: [PremiumService, PremiumAccessService],
  exports: [PremiumAccessService],
})
export class PremiumModule {}
