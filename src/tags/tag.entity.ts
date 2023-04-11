import { Column, Entity, JoinColumn, ManyToMany, RelationCount } from 'typeorm';
import { Base } from 'src/utils/base';
import { QuestionEntity } from 'src/questions/question.entity';

@Entity('tags')
export class TagEntity extends Base {
  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => QuestionEntity, (question) => question.tags)
  questions: QuestionEntity[];

  @Column({ default: 0 })
  questionCount: number;

  @Column({ default: 0 })
  postsCount: number;
}
