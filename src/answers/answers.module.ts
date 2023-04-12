import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerEntity } from './answer.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CommentEntity } from 'src/comments/comment.entity';

@Module({
  controllers: [AnswersController],
  providers: [AnswersService],
  imports: [
    TypeOrmModule.forFeature([AnswerEntity, CommentEntity]),
    AuthModule,
  ],
})
export class AnswersModule {}
