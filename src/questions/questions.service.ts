import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionDto } from './dto/question.dto';
import { SearchQuestionDto } from './dto/search-question.dto';
import { QuestionEntity } from './question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionEntity)
    private questionsRepository: Repository<QuestionEntity>,
  ) {}

  async createQuestion(dto: QuestionDto, userId: number) {
    const question = await this.questionsRepository.save({
      ...dto,
      user: { id: userId },
    });
    return question;
  }

  async getAll(dto: SearchQuestionDto) {
    const qb = await this.questionsRepository.createQueryBuilder('q');

    const limit = dto.limit || 2;
    const page = dto.page || 2;

    if (dto.limit) {
      qb.take(dto.limit);
    }
    if (dto.page) {
      qb.skip((page - 1) * limit);
    }

    if (dto.orderBy === 'popular') {
      qb.orderBy('q.views', 'DESC');
    } else {
      qb.orderBy('q.createdAt', 'DESC');
    }

    if (dto.tagBy) {
      const tag = dto.tagBy;
      qb.innerJoin('q.tags', 'tag').where('tag.name = :tag', { tag });
    }

    if (dto.userId) {
      const user = dto.userId;
      qb.innerJoin('q.user', 'user').where('user.id = :user', { user });
    }

    if (dto.search) {
      qb.where('LOWER(q.title) LIKE LOWER(:title)', {
        title: `%${dto.search}%`,
      });
    }

    const [questions, total] = await qb
      .leftJoinAndSelect('q.tags', 'tags')
      .getManyAndCount();

    const items = questions.map((obj) => {
      delete obj.body;
      return {
        ...obj,
        tags: obj.tags.map((item) => ({
          id: item.id,
          name: item.name,
        })),
      };
    });
    return { total, items };
  }

  async getQuestionById(id: number) {
    await this.questionsRepository
      .createQueryBuilder('questions')
      .whereInIds(id)
      .update()
      .set({
        views: () => 'views + 1',
      })
      .execute();

    const question = await this.questionsRepository
      .createQueryBuilder('q')
      .whereInIds(id)
      .leftJoinAndSelect('q.user', 'user')
      .leftJoinAndSelect('q.tags', 'tags')
      .getOne();

    return {
      ...question,
      user: {
        id: question.user.id,
        login: question.user.login,
        firstName: question.user.firstName,
        lastName: question.user.lastName,
        avatar: question.user.avatar,
      },
      tags: question.tags.map((obj) => ({
        id: obj.id,
        name: obj.name,
      })),
    };
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
