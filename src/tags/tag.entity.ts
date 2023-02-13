import { Base } from 'src/utils/base';
import { Column, Entity } from 'typeorm';

@Entity('tags')
export class TagEntity extends Base {
  @Column({ unique: true })
  name: string;

  @Column()
  description: string;
}
