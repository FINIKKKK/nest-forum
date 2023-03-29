import { OutputBlockData } from 'src/questions/dto/question.dto';
import { QuestionEntity } from 'src/questions/question.entity';
import { UserEntity } from 'src/users/user.entity';
import { Base } from 'src/utils/base';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('answers')
export class AnswerEntity extends Base {
  @CreateDateColumn()
  updated: Date;

  @Column({ type: 'jsonb' })
  body: OutputBlockData[];

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => QuestionEntity, (question) => question.id)
  @JoinColumn({ name: 'question' })
  question: QuestionEntity;

  @Column({ default: false })
  isAnswer: boolean;

  @Column({ default: 0 })
  rating: number;
}
