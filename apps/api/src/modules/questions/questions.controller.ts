import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateQuestionDto, ListQuestionsQueryDto, UpdateQuestionDto } from './dto/question.dto';
import { CSV_HEADERS } from './question-csv';
import { QuestionsService } from './questions.service';

@ApiTags('admin / questions')
@ApiBearerAuth()
@Roles('ADMIN')
@Controller('admin/questions')
export class AdminQuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  list(@Query() query: ListQuestionsQueryDto) {
    return this.questionsService.list(query);
  }

  @Get('import/template')
  @Header('Content-Type', 'text/csv; charset=utf-8')
  @Header('Content-Disposition', 'attachment; filename="questions-template.csv"')
  template(): string {
    const sample = [
      'computer-science',
      'Boolean Algebra',
      'EASY',
      '"What is the result of A + A\'?"',
      '',
      '0',
      '1',
      'A',
      "A'",
      'B',
      '"By the complement law, A + A\' = 1."',
      '',
      'FREE',
      'true',
    ];
    return `${CSV_HEADERS.join(',')}\n${sample.join(',')}\n`;
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post('import')
  import(@UploadedFile() file?: Express.Multer.File) {
    return this.questionsService.importCsv(file);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateQuestionDto) {
    return this.questionsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateQuestionDto) {
    return this.questionsService.update(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
}
