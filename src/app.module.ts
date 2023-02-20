import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FilesService } from './files/files.service';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { QuestionsModule } from './questions/questions.module';
import { TagsModule } from './tags/tags.module';
import * as path from 'path';
import { UserEntity } from './users/user.entity';
import { QuestionEntity } from './questions/question.entity';
import { TagEntity } from './tags/tag.entity';
import { AnswersModule } from './answers/answers.module';
import { AnswerEntity } from './answers/answer.entity';
import { CommentsModule } from './comments/comments.module';
import { CommentEntity } from './comments/comment.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [UserEntity, QuestionEntity, TagEntity, AnswerEntity, CommentEntity],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    FilesModule,
    QuestionsModule,
    TagsModule,
    AnswersModule,
    CommentsModule,
  ],
})
export class AppModule {}
