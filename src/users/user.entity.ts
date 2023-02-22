import { Column, Entity, OneToMany, RelationCount } from 'typeorm';
import { Base } from 'src/utils/base';
import { QuestionEntity } from 'src/questions/question.entity';
import { AnswerEntity } from 'src/answers/answer.entity';

@Entity('users')
export class UserEntity extends Base {
  @Column({ unique: true })
  login: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

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
}
