import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnswerEntity } from './answer.entity';
import { AnswerDto } from './dto/answer.dto';
import { ParamsAnswerDto } from './dto/params-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

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
      question: { id: dto.questionId },
    });
    return answer;
  }

  async getAllAnswers(dto: ParamsAnswerDto) {
    const qb = this.answersRepository.createQueryBuilder('a');
    const questionId = dto.questionId;

    if (dto.questionId) {
      qb.where('a.question = :questionId', { questionId });
    }

    if (dto.orderBy === 'date') {
      qb.orderBy('a.createdAt', 'DESC');
    } else {
      qb.orderBy('a.rating', 'DESC');
    }

    const [items, total] = await qb
      .leftJoinAndSelect('a.user', 'user')
      .leftJoinAndSelect('a.question', 'question')
      .getManyAndCount();

    const questions = items.map((obj) => {
      return {
        ...obj,
        user: {
          id: obj.user.id,
          login: obj.user.login,
          firstName: obj.user.firstName,
          lastName: obj.user.lastName,
          avatar: obj.user.avatar,
        },
        question: {
          id: obj.question.id,
        },
      };
    });

    return questions;
  }

  async getAnswerById(id: number) {
    const answer = await this.answersRepository.findOne({
      where: {
        id,
      },
    });
    return answer;
  }

  async updateAnswer(id: number, dto: UpdateAnswerDto) {
    const answer = await this.answersRepository.update(id, dto);
    return answer;
  }

  async removeAnswer(id: number) {
    const answer = await this.answersRepository.delete(id);
    return answer;
  }
}
