import { IsArray, IsNumber } from 'class-validator';
import { OutputBlockData } from 'src/questions/dto/question.dto';

export class AnswerDto {
  @IsArray()
  readonly body: OutputBlockData[];

  @IsNumber()
  readonly questionId: number;
}
