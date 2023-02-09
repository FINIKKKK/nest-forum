import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionDto } from './dto/question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}
  @Post()
  create(@Body() dto: QuestionDto) {
    return this.questionsService.createQuestion(dto);
  }

  @Get()
  findAll() {
    return this.questionsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.questionsService.getQuestionById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: QuestionDto) {
    return this.questionsService.updateQuestion(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.questionsService.removeQuestion(id);
  }
}
