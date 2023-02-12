import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
<<<<<<< HEAD
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionDto } from './dto/question.dto';
import { User } from 'src/users/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
=======
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionDto } from './dto/question.dto';
>>>>>>> 6ba01bcf749cd4af49aaffd62ade2c66372f949b

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}
<<<<<<< HEAD
  
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: QuestionDto, @User() userId: number) {
    return this.questionsService.createQuestion(dto, userId);
=======
  @Post()
  create(@Body() dto: QuestionDto) {
    return this.questionsService.createQuestion(dto);
>>>>>>> 6ba01bcf749cd4af49aaffd62ade2c66372f949b
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
