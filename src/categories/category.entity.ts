import { Base } from 'src/utils/base';
import { Column, Entity } from 'typeorm';

@Entity('categories')
export class CategoryEntity extends Base {
  @Column({ unique: true })
  value: string;

  @Column({ unique: true })
  label: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  postsCount: number;
}
