import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from 'src/utils/base';

@Entity('users')
export class UserEntity extends Base {
  @Column({ unique: true })
  login: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  avatar: string;
}
