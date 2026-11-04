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
import { Public } from '../../common/decorators/public.decorator';
import { type AuthUser } from '../../common/types/auth-user';
import { Roles } from '../../common/decorators/roles.decorator';
import { CircularsService } from './circulars.service';
import { CreateCircularDto, UpdateCircularDto } from './dto/circular.dto';
import { AdminListCircularsQueryDto, ListCircularsQueryDto } from './dto/list-circulars.dto';

@ApiTags('circulars')
@Controller('circulars')
export class CircularsController {
  constructor(private readonly circularsService: CircularsService) {}

  @Public()
  @Get()
  list(@Query() query: ListCircularsQueryDto) {
    return this.circularsService.listPublic(query);
  }

  @Public()
  @Get('summary')
  summary() {
    return this.circularsService.summary();
  }

  @ApiBearerAuth()
  @Get('saved')
  saved(@CurrentUser() user: AuthUser) {
    return this.circularsService.listSaved(user.id);
  }

  @ApiBearerAuth()
  @Put(':id/save')
  save(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.circularsService.save(user.id, id);
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/save')
  unsave(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.circularsService.unsave(user.id, id);
  }

  /** Must stay last: `:slug` would otherwise shadow `saved`. */
  @Public()
  @Get(':slug')
  findBySlug(@Param('slug') slug: string, @CurrentUser() user?: AuthUser) {
    return this.circularsService.findPublicBySlug(slug, user?.id);
  }
}

@ApiTags('admin / circulars')
@ApiBearerAuth()
@Roles('ADMIN')
@Controller('admin/circulars')
export class AdminCircularsController {
  constructor(private readonly circularsService: CircularsService) {}

  @Get()
  list(@Query() query: AdminListCircularsQueryDto) {
    return this.circularsService.listAdmin(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.circularsService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateCircularDto) {
    return this.circularsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCircularDto) {
    return this.circularsService.update(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.circularsService.remove(id);
  }
}
