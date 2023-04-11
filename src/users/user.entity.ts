import {
  Column,
  Entity,
  OneToMany,
  RelationCount,
} from 'typeorm';
import { Base } from 'src/utils/base';
import { QuestionEntity } from 'src/questions/question.entity';
import { AnswerEntity } from 'src/answers/answer.entity';

@Entity('users')
export class UserEntity extends Base {
  @Column({ unique: true })
  login: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => QuestionEntity, (question) => question.user)
  questions: QuestionEntity[];

  @RelationCount((user: UserEntity) => user.questions)
  questionCount: number;

  @OneToMany(() => AnswerEntity, (answer) => answer.user)
  answers: AnswerEntity[];

  @RelationCount((user: UserEntity) => user.answers)
  answerCount: number;

  @Column({ nullable: true })
  about?: string;

  @Column({ nullable: true })
  location?: string;

  // @ManyToMany(() => QuestionEntity, (question) => question.id)
  // @JoinTable()
  // favorites?: QuestionEntity[];

  @Column({ type: 'jsonb', default: [] })
  favorites!: Number[];

  @Column({ default: true })
  showEmail: boolean;

  @Column({ default: false })
  isAdmin: boolean;
}
