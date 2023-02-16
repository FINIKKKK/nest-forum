import { TagEntity } from 'src/tags/tag.entity';
import { UserEntity } from 'src/users/user.entity';
import { Base } from 'src/utils/base';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { OutputBlockData } from './dto/question.dto';

@Entity('questions')
export class QuestionEntity extends Base {
  @Column()
  title: string;

  @Column({ type: 'jsonb' })
  body: OutputBlockData[];

  @Column({ default: 0 })
  views: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToMany(() => TagEntity, (tag) => tag.questions)
  @JoinTable()
  tags: TagEntity[];
}
