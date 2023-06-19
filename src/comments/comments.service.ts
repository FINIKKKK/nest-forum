import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CommentDto } from './dto/create-comment.dto';
import { ParamsCommentDto } from './dto/params-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentsRepository: Repository<CommentEntity>,
  ) {}

  async createComment(dto: CommentDto, userId: number) {
    const comment = await this.commentsRepository.save({
      ...dto,
      user: {
        id: userId,
      },
      question: {
        id: dto.questionId,
      },
      answer: {
        id: dto.answerId,
      },
    });
    return comment;
  }

  async getAllComments(dto: ParamsCommentDto) {
    const qb = this.commentsRepository
      .createQueryBuilder('c')
      .orderBy('c.createdAt', 'DESC')
      .leftJoinAndSelect('c.user', 'user')
      .leftJoinAndSelect('c.question', 'question')
      .leftJoinAndSelect('c.answer', 'answer')
      .leftJoinAndSelect('c.post', 'post');

    if (dto.questionId) {
      qb.where('question.id = :questionId', { questionId: dto.questionId });
    }

    if (dto.answerId) {
      qb.where('answer.id = :answerId', {
        answerId: dto.answerId,
      });
    }

    const [comments, total] = await qb.getManyAndCount();

    const items = comments.map((obj) => {
      const newObj = {
        ...obj,
        user: {
          id: obj.user.id,
          login: obj.user.login,
          name: obj.user.name,
        },
        question: null,
        answer: null,
      };

      if (obj.question) {
        newObj.question = {
          id: obj.question.id,
        };
      }
      if (obj.answer) {
        newObj.answer = {
          id: obj.answer.id,
        };
      }

      return newObj;
    });

    return { total, items };
  }

  async getCommentById(id: number) {
    const comment = await this.commentsRepository.findOne({
      where: {
        id,
      },
    });
    return comment;
  }

  async updateComment(id: number, dto: CommentDto) {
    await this.commentsRepository.update(id, dto);

    const comment = await this.commentsRepository
      .createQueryBuilder('c')
      .whereInIds(id)
      .leftJoinAndSelect('c.user', 'user')
      .getOne();

    return {
      ...comment,
      user: {
        id: comment.user.id,
        login: comment.user.login,
      },
    };
  }

  async removeComment(id: number) {
    const comment = await this.commentsRepository.delete(id);
    return comment;
  }
}
