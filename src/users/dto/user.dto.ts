import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UserDto {
  @IsString({ message: 'Поле должно быть строкой' })
  @Length(3, Number.MAX_SAFE_INTEGER, {
    message: 'Логин должен состоять минимум из 3 символов',
  })
  readonly login: string;

  @IsString({ message: 'Поле должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;
  
  @IsOptional()
  @IsString({ message: 'Поле должно быть строкой' })
  @Length(9, Number.MAX_SAFE_INTEGER, {
    message: 'Пароль должен состоять минимум из 9 символов',
  })
  readonly password?: string;

  readonly name?: string;

  readonly about?: string;

  readonly location?: string;
}
