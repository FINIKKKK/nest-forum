import { ArgumentMetadata, PipeTransform } from '@nestjs/common/interfaces';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from './validation.exception';

export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);
    if (errors.length) {
      let messages = errors.map((err) => {
        return `${err.property} = ${Object.values(err.constraints).join(' ')}`;
      });
      throw new ValidationException(messages);
    }
    return value;
  }
}
