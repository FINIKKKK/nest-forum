import { PartialType } from '@nestjs/mapped-types';
import { AnswerDto } from './answer.dto';

export class UpdateAnswerDto extends PartialType(AnswerDto) {}
