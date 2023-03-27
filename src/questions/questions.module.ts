import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './question.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AnswerEntity } from 'src/answers/answer.entity';
import { CommentEntity } from 'src/comments/comment.entity';
import { UserEntity } from 'src/users/user.entity';
import { TagEntity } from 'src/tags/tag.entity';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService],
  imports: [
    TypeOrmModule.forFeature([
      QuestionEntity,
      AnswerEntity,
      CommentEntity,
      UserEntity,
      TagEntity,
    ]),
    AuthModule,
  ],
})
export class QuestionsModule {}
