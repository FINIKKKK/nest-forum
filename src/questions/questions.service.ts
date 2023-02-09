import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionDto } from './dto/question.dto';
import { QuestionEntity } from './question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionEntity)
    private questionsRepository: Repository<QuestionEntity>,
  ) {}

  async createQuestion(dto: QuestionDto) {
    const question = await this.questionsRepository.save(dto);
    return question;
  }

  async getAll() {
    const questions = await this.questionsRepository.find();
    return questions;
  }

  async getQuestionById(id: number) {
    const question = await this.questionsRepository.findOne({
      where: {
        id,
      },
    });
    return question;
  }

  async updateQuestion(id: number, dto: QuestionDto) {
    const question = await this.questionsRepository.update(id, dto);
    return question;
  }

  async removeQuestion(id: number) {
    const question = await this.questionsRepository.delete(id);
    return question;
  }
}
