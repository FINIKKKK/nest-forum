import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @IsString({ message: 'Поле должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @IsString({ message: 'Поле должно быть строкой' })
  readonly password: string;
}
