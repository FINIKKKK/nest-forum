import { OutputBlockData } from 'src/questions/dto/question.dto';
import { UserEntity } from 'src/users/user.entity';
import { Base } from 'src/utils/base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('answers')
export class AnswerEntity extends Base {
  @Column({ type: 'jsonb' })
  body: OutputBlockData[];

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @Column({ default: false })
  isAnswer: boolean;

  @Column({ default: 0 })
  rating: number;
}
