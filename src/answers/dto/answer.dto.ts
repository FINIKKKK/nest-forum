import { OutputBlockData } from 'src/questions/dto/question.dto';

export class AnswerDto {
  readonly body: OutputBlockData[];
  readonly questionId: number;
}
