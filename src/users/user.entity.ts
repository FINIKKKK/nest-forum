import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from 'src/utils/base';

@Entity('users')
export class UserEntity extends Base {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  password?: string;
}
