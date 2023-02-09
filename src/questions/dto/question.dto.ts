import { IsArray, IsString } from 'class-validator';

export type OutputBlockData = {
  id?: number;
  type: any;
  data: any;
};

export class QuestionDto {
  @IsString()
  readonly title: string;

  @IsArray()
  readonly body: OutputBlockData[];
}
