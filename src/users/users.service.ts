import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: UserDto) {
    const user = await this.usersRepository.save(dto);
    return user;
  }

  async getAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    return user;
  }

  async updateUser(id: number, dto: UserDto) {
    const user = await this.usersRepository.update(id, dto);
    return user;
  }

  async removeUser(id: number) {
    const user = await this.usersRepository.delete(id);
    return user;
  }
}
