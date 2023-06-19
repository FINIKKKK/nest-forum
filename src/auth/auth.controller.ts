import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {UserDto} from 'src/users/dto/user.dto';
import {AuthService} from './auth.service';
import {LoginUserDto} from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('/login')
    login(@Body() dto: LoginUserDto) {
        return this.authService.login(dto);
    }

    @Post('/register')
    register(@Body() dto: UserDto) {
        return this.authService.register(dto);
    }

    // @Get('google')
    // @UseGuards(AuthGuard('google'))
    // async authGoogle() {}

    // @Get('google/callback')
    // @UseGuards(AuthGuard('google'))
    // async googleAuthCallback(@Req() req) {
    //   this.authService.authSocial(req.user)
    // }
    //
    // @Get('github')
    // @UseGuards(AuthGuard('github'))
    // async authGithub() {}
    //
    // @Get('github/callback')
    // @UseGuards(AuthGuard('github'))
    // async githubAuthCallback(@Req() req) {
    //   console.log(req.user);
    //   this.authService.authSocial(req.user)s
    // }
}
