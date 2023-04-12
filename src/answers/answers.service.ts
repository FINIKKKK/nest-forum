import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/comments/comment.entity';
import { Repository } from 'typeorm';
import { AnswerEntity } from './answer.entity';
import { AnswerDto } from './dto/answer.dto';
import { ParamsAnswerDto } from './dto/params-answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(AnswerEntity)
    private answersRepository: Repository<AnswerEntity>,
    @InjectRepository(CommentEntity)
    private commentsRepository: Repository<CommentEntity>,
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

    if (dto.orderBy === 'date1') {
      qb.orderBy('a.isAnswer', 'ASC');
      qb.addOrderBy('a.createdAt', 'DESC');
    } else if (dto.orderBy === 'date2') {
      qb.orderBy('a.isAnswer', 'ASC');
      qb.addOrderBy('a.rating', 'ASC');
    } else {
      qb.orderBy('a.isAnswer', 'DESC');
      qb.addOrderBy('a.rating', 'DESC');
    }

    const [items, total] = await qb
      .leftJoinAndSelect('a.user', 'user')
      .leftJoinAndSelect('a.question', 'question')
      .getManyAndCount();

    const answers = items.map((obj) => {
      return {
        ...obj,
        user: {
          id: obj.user.id,
          login: obj.user.login,
          name: obj.user.name,
          avatar: obj.user.avatar,
        },
        question: {
          id: obj.question.id,
        },
      };
    });

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

  async setAnswerIsSolved(id: number, dto: AnswerDto) {
    const qb = this.answersRepository
      .createQueryBuilder('answers')
      .leftJoinAndSelect('answers.question', 'question');
    await qb
      .update()
      .set({ isAnswer: false })
      .where('answers.question = :questionId', {
        questionId: dto.questionId,
      })
      .execute();

    delete dto.questionId;
    const answer = await this.answersRepository.update(id, dto);

    return answer;
  }

  async updateAnswer(id: number, dto: AnswerDto) {
    const answer = await this.answersRepository.findOne({ where: { id } });
    answer.updated = new Date();
    await this.answersRepository.save(answer);
    await this.answersRepository.update(id, dto);
    return answer;
  }

  async removeAnswer(id: number) {
    await this.commentsRepository.delete({ answer: { id } });
    await this.answersRepository.delete(id);
  }
}
