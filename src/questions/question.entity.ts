import { TagEntity } from 'src/tags/tag.entity';
import { UserEntity } from 'src/users/user.entity';
import { AnswerEntity } from 'src/answers/answer.entity';
import { Base } from 'src/utils/base';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  RelationCount,
} from 'typeorm';
import { OutputBlockData } from './dto/question.dto';

@Entity('questions')
export class QuestionEntity extends Base {
  @CreateDateColumn()
  updated: Date;

  @Column()
  title: string;

  @Column({ type: 'jsonb' })
  body: OutputBlockData[];

  @Column({ default: 0 })
  views: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  answers: AnswerEntity[];

  @RelationCount((question: QuestionEntity) => question.answers)
  answerCount: number;

  @ManyToMany(() => TagEntity, (tag) => tag.questions)
  @JoinTable()
  tags: TagEntity[];

  @Column({ type: 'boolean', default: false })
  isAnswer: boolean;
}
