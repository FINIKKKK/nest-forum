import { PartialType } from '@nestjs/mapped-types';
import { QuestionDto } from './question.dto';

export class UpdateQuestionDto extends PartialType(QuestionDto) {}
