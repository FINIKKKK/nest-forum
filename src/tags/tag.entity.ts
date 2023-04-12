import { Column, Entity, ManyToMany } from 'typeorm';
import { Base } from 'src/utils/base';
import { QuestionEntity } from 'src/questions/question.entity';
import { PostEntity } from 'src/posts/post.entity';

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

  @ManyToMany(() => PostEntity, (post) => post.tags)
  posts: PostEntity[];

  @Column({ default: 0 })
  postsCount: number;
}
