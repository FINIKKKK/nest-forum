<<<<<<< HEAD
import { UserEntity } from 'src/users/user.entity';
import { Base } from 'src/utils/base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { OutputBlockData } from './dto/question.dto';
=======
import { Base } from "src/utils/base";
import { Column, Entity } from "typeorm";
import { OutputBlockData } from "./dto/question.dto";
>>>>>>> 6ba01bcf749cd4af49aaffd62ade2c66372f949b

@Entity('questions')
export class QuestionEntity extends Base {
  @Column()
  title: string;

  @Column({ type: 'jsonb' })
  body: OutputBlockData[];
<<<<<<< HEAD

  @Column({ default: 0 })
  views: number;

  @ManyToOne(() => UserEntity, { eager: false })
  @JoinColumn({ name: 'user' })
  user: UserEntity;
=======
>>>>>>> 6ba01bcf749cd4af49aaffd62ade2c66372f949b
}
