import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt/dist';
import { UserEntity } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET',
      signOptions: {
        expiresIn: '14d',
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
