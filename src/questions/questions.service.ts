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

<<<<<<< HEAD
  async createQuestion(dto: QuestionDto, userId: number) {
    const question = await this.questionsRepository.save({
      ...dto,
      user: { id: userId },
    });

=======
  async createQuestion(dto: QuestionDto) {
    const question = await this.questionsRepository.save(dto);
>>>>>>> 6ba01bcf749cd4af49aaffd62ade2c66372f949b
    return question;
  }

  async getAll() {
    const questions = await this.questionsRepository.find();
    return questions;
  }

  async getQuestionById(id: number) {
<<<<<<< HEAD
    // await this.questionsRepository
    //   .createQueryBuilder('questions')
    //   .whereInIds(id)
    //   .update()
    //   .set({
    //     views: () => 'views + 1',
    //   })
    //   .execute();

    const question = await this.questionsRepository
      .createQueryBuilder('q')
      .whereInIds(id)
      .leftJoinAndSelect('q.user', 'user')
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
    };
=======
    const question = await this.questionsRepository.findOne({
      where: {
        id,
      },
    });
    return question;
>>>>>>> 6ba01bcf749cd4af49aaffd62ade2c66372f949b
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
