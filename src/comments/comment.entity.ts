import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from 'src/utils/base';
import { UserEntity } from 'src/users/user.entity';
import { QuestionEntity } from 'src/questions/question.entity';
import { AnswerEntity } from 'src/answers/answer.entity';

@Entity('comments')
export class CommentEntity extends Base {
  @Column()
  text: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => QuestionEntity, (question) => question.id)
  @JoinColumn({ name: 'question' })
  question: QuestionEntity;

  @ManyToOne(() => AnswerEntity, (answer) => answer.id)
  @JoinColumn({ name: 'answer' })
  answer: AnswerEntity;
}
