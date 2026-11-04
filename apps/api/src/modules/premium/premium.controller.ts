import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { type AuthUser } from '../../common/types/auth-user';
import { GrantEntitlementDto } from './dto/grant-entitlement.dto';
import { ListEntitlementsQueryDto } from './dto/list-entitlements.dto';
import { PremiumService } from './premium.service';

@ApiTags('premium')
@ApiBearerAuth()
@Controller()
export class PremiumController {
  constructor(private readonly premiumService: PremiumService) {}

  @Public()
  @Get('premium/plans')
  listPlans() {
    return this.premiumService.listActivePlans();
  }

  @Get('premium/me')
  myAccess(@CurrentUser() user: AuthUser) {
    return this.premiumService.getMyAccess(user.id);
  }

  @Roles('ADMIN')
  @Get('admin/entitlements')
  listEntitlements(@Query() query: ListEntitlementsQueryDto) {
    return this.premiumService.listEntitlements(query);
  }

  @Roles('ADMIN')
  @Post('admin/entitlements')
  grant(@Body() dto: GrantEntitlementDto, @CurrentUser() admin: AuthUser) {
    return this.premiumService.grant(dto, admin.id);
  }

  @Roles('ADMIN')
  @Post('admin/entitlements/:id/revoke')
  revoke(@Param('id') id: string) {
    return this.premiumService.revoke(id);
  }
}
