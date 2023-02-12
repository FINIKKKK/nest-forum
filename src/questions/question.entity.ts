import { UserEntity } from 'src/users/user.entity';
import { Base } from 'src/utils/base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { OutputBlockData } from './dto/question.dto';

@Entity('questions')
export class QuestionEntity extends Base {
  @Column()
  title: string;

  @Column({ type: 'jsonb' })
  body: OutputBlockData[];

  @Column({ default: 0 })
  views: number;

  @ManyToOne(() => UserEntity, { eager: false })
  @JoinColumn({ name: 'user' })
  user: UserEntity;
}
