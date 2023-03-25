import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
} from '@nestjs/common';
import {
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ParamsUserDto } from './dto/params-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/favorite')
  favorite(@Request() req, @Body() dto: { questionId: number }) {
    return this.usersService.addQuestionToFavorite(req.user.id, dto.questionId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return this.usersService.getUserById(req.user.id);
  }

  @Get()
  findAll(@Query() dto: ParamsUserDto) {
    return this.usersService.getAll(dto);
  }

  @Get(':login')
  findOne(@Param('login') login: number) {
    return this.usersService.getUserByLogin(`${login}`);
  }

  @Patch('/avatar/:id')
  @UseInterceptors(FileInterceptor('avatar'))
  updateAvatar(@Param('id') id: number, @UploadedFile() avatar) {
    return this.usersService.updateUserAvatar(id, avatar);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.removeUser(id);
  }
}
