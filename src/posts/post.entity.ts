import { CategoryEntity } from 'src/categories/category.entity';
import { CommentEntity } from 'src/comments/comment.entity';
import { OutputBlockData } from 'src/questions/dto/question.dto';
import { TagEntity } from 'src/tags/tag.entity';
import { UserEntity } from 'src/users/user.entity';
import { Base } from 'src/utils/base';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  RelationCount,
} from 'typeorm';

@Entity('posts')
export class PostEntity extends Base {
  @Column()
  title: string;

  @Column({ type: 'jsonb' })
  body: OutputBlockData[];

  @Column()
  image: string;

  @Column()
  description: string;

  @Column()
  slug: string;

  @Column({ default: 0 })
  views: number;

  @ManyToOne(() => CategoryEntity, (category) => category.id)
  @JoinColumn({ name: 'category' })
  category: CategoryEntity;

  @ManyToMany(() => TagEntity, (tag) => tag.posts)
  @JoinTable()
  tags: TagEntity[];

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];

  @RelationCount((post: PostEntity) => post.comments)
  commentsCount: number;

  @CreateDateColumn()
  updated: Date;
}
