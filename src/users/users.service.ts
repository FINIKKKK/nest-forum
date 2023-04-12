import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { ParamsUserDto } from './dto/params-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QuestionEntity } from 'src/questions/question.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private fileService: FilesService,
    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>,
  ) {}

  async createUser(dto: UserDto) {
    const userName = dto.login.replace(/ /g, '_').toLocaleLowerCase();
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

    const [users, total] = await qb.getManyAndCount();

    const items = users
      .filter((obj) => !obj.isAdmin)
      .map(({ password, ...obj }) => obj);

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
    const { password, ...userData } = user;
    return userData;
  }

  async addQuestionToFavorite(userId: number, questionId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }

    const question = await this.questionRepository.findOne({
      where: { id: questionId },
    });
    if (!question) {
      throw new HttpException('Вопрос не найден', HttpStatus.BAD_REQUEST);
    }

    if (user.favorites.includes(question.id)) {
      user.favorites = user.favorites.filter((id) => id !== question.id);
    } else {
      user.favorites.push(question.id);
    }
    await this.usersRepository.save(user);

    const { password, ...userData } = user;
    return userData;
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const hashPassword = dto.password
      ? await bcrypt.hash(dto.password, 5)
      : undefined;

    const userName = dto.login
      ? dto.login.replace(/ /g, '_').toLocaleLowerCase()
      : undefined;

    const user = await this.usersRepository.update(id, {
      ...dto,
      ...(userName && { login: userName }),
      ...(hashPassword && { password: hashPassword }),
    });
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

  async updateUserPassword(
    id: number,
    dto: { oldPassword: string; newPassword: string },
  ) {
    const user = await this.usersRepository.findOne({ where: { id } });
    const isTruePassword = await bcrypt.compare(dto.oldPassword, user.password);

    if (!isTruePassword) {
      throw new UnauthorizedException({
        message: 'Неверный пароль',
      });
    }

    const hashPassword = dto.newPassword
      ? await bcrypt.hash(dto.newPassword, 5)
      : undefined;

    await this.usersRepository.update(id, {
      password: hashPassword,
    });
    return 'Пароль обновлен';
  }

  async removeUser(id: number) {
    await this.usersRepository.delete(id);
    return 'Пользователь удален';
  }
}
