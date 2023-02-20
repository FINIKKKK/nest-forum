import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Query, UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/users/user.decorator';
import { AnswersService } from './answers.service';
import { AnswerDto } from './dto/answer.dto';
import { ParamsAnswerDto } from './dto/params-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: AnswerDto, @User() userId: number) {
    console.log(userId);
    return this.answersService.createAnswer(dto, userId);
  }

  @Get()
  findAll(@Query() dto: ParamsAnswerDto) {
    return this.answersService.getAllAnswers(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.answersService.getAnswerById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateAnswerDto) {
    return this.answersService.updateAnswer(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.answersService.removeAnswer(id);
  }
}
