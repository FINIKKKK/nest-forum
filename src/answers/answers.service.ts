import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnswerEntity } from './answer.entity';
import { AnswerDto } from './dto/answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(AnswerEntity)
    private answersRepository: Repository<AnswerEntity>,
  ) {}

  async createAnswer(dto: AnswerDto, userId: number) {
    const answer = await this.answersRepository.save({
      ...dto,
      user: { id: userId },
    });
    return answer;
  }

  async getAllAnswers() {
    const answers = await this.answersRepository.find();
    return answers;
  }

  async getAnswerById(id: number) {
    const answer = await this.answersRepository.findOne({
      where: {
        id,
      },
    });
    return answer;
  }

  async updateAnswer(id: number, dto: AnswerDto) {
    const answer = await this.answersRepository.update(id, dto);
    return answer;
  }

  async removeAnswer(id: number) {
    const answer = await this.answersRepository.delete(id);
    return answer;
  }
}
