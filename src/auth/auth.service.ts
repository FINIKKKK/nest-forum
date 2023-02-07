import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import {
  HttpException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/user.dto';
import { UserEntity } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginUserDto) {
    const user = await this.usersService.getUserByEmail(dto.email);
    const password = user
      ? await bcrypt.compare(dto.password, user.password)
      : undefined;

    console.log(user, password);

    if (user && password) {
      return this.generateToken(user);
    }
    throw new UnauthorizedException({
      message: 'Неверный email или пароль',
    });
  }

  async register(dto: UserDto) {
    const findUserByName = await this.usersService.getUserByName(dto.name);
    const findUserByEmail = await this.usersService.getUserByEmail(dto.email);
    if (findUserByName) {
      throw new HttpException(
        'Данный логин уже используется',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (findUserByEmail) {
      throw new HttpException(
        'Данный email уже используется',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.usersService.createUser({
      ...dto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: UserEntity) {
    const payload = { id: user.id, name: user.name, email: user.email };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private validateUser(user: UserEntity) {}
}
