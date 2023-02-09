import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './question.entity';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService],
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
})
export class QuestionsModule {}
