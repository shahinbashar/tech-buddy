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
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateNoteDto, ListNotesQueryDto, UpdateNoteDto } from './dto/note.dto';
import { NotesService } from './notes.service';

/** Public note reading happens through the topic endpoint, which applies premium gating. */
@ApiTags('admin / notes')
@ApiBearerAuth()
@Roles('ADMIN')
@Controller('admin/notes')
export class AdminNotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  list(@Query() query: ListNotesQueryDto) {
    return this.notesService.list(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateNoteDto) {
    return this.notesService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNoteDto) {
    return this.notesService.update(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
