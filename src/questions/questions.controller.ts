import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionDto } from './dto/question.dto';
import { User } from 'src/users/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: QuestionDto, @User() userId: number) {
    return this.questionsService.createQuestion(dto, userId);
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
