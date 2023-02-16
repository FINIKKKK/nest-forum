import { QuestionEntity } from 'src/questions/question.entity';
import { Base } from 'src/utils/base';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

@Entity('tags')
export class TagEntity extends Base {
  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => QuestionEntity, (question) => question.tags)
  questions: QuestionEntity[];
}
