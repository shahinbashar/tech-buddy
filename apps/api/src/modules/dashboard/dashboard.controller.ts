import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { type AuthUser } from '../../common/types/auth-user';
import { DashboardService } from './dashboard.service';

@ApiTags('dashboard')
@ApiBearerAuth()
@Controller()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('dashboard/me')
  me(@CurrentUser() user: AuthUser) {
    return this.dashboardService.userDashboard(user.id);
  }

  @Roles('ADMIN')
  @Get('admin/dashboard')
  admin() {
    return this.dashboardService.adminOverview();
  }
}
