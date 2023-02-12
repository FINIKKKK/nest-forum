import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './question.entity';
<<<<<<< HEAD
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
=======
>>>>>>> 6ba01bcf749cd4af49aaffd62ade2c66372f949b

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService],
<<<<<<< HEAD
  imports: [TypeOrmModule.forFeature([QuestionEntity]), AuthModule],
=======
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
>>>>>>> 6ba01bcf749cd4af49aaffd62ade2c66372f949b
})
export class QuestionsModule {}
