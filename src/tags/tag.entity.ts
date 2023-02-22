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

  @RelationCount((tag: TagEntity) => tag.questions)
  questionCount: number;
}
