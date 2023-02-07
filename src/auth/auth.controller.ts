import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from 'src/users/user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }
  
  @Post('/register')
  register(@Body() dto: UserDto) {
    return this.authService.register(dto);
  }
}
