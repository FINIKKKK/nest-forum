import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { ParamsUserDto } from './dto/params-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private fileService: FilesService,
  ) {}

  async createUser(dto: UserDto) {
    const userName = dto.login.toLocaleLowerCase();
    const user = await this.usersRepository.save({
      ...dto,
      login: userName,
    });
    return user;
  }

  async getAll(dto: ParamsUserDto) {
    const qb = await this.usersRepository.createQueryBuilder('u');

    const limit = dto.limit || 2;
    const page = dto.page || 2;

    if (dto.limit) {
      qb.take(dto.limit);
    }
    if (dto.page) {
      qb.skip((page - 1) * limit);
    }

    if (dto.search) {
      qb.where('LOWER(u.login) LIKE LOWER(:login)', {
        login: `%${dto.search}%`,
      });
    }

    const [items, total] = await qb.getManyAndCount();

    return { total, items };
  }

  async getUserByLogin(login: string) {
    const user = await this.usersRepository.findOne({ where: { login } });
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    return user;
  }

  async updateUserAvatar(id: number, avatar: any) {
    const fileName = await this.fileService.uploadImage(avatar, {
      imagePath: 'avatars',
    });

    await this.usersRepository.update(id, {
      avatar: fileName,
    });
    return fileName;
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.usersRepository.update(id, {
      ...dto,
      password: hashPassword,
    });
    return user;
  }

  async removeUser(id: number) {
    const user = await this.usersRepository.delete(id);
    return user;
  }
}
