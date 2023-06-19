import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async uploadImage(image, dto) {
    try {
      if (image.size > 2 * 1024 * 1024) {
        throw new BadRequestException('Файл должен быть размером меньше 2мб');
      }
      const exp = image.originalname.match(/\.[^.]+$/)[0];
      if (exp === '.jpg' || exp === '.png' || exp === '.jpeg') {
        const fileName = uuid.v4() + exp;
        const filePath = path.resolve(
          __dirname,
          '..',
          `static/img/${dto.imagePath}`,
        );
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true });
        }
        fs.writeFileSync(path.join(filePath, fileName), image.buffer);
        const fullFileName = `http://localhost:7777/img${
          '/' + dto.imagePath
        }/${fileName}`;
        return fullFileName;
      }
      throw new BadRequestException(
        'Файл должен быть расширением png, jpg, jpeg',
      );
    } catch (err) {
      if (err instanceof BadRequestException) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Не удалось загрузить файл',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
