import { IsArray, IsString } from 'class-validator';
import { TagEntity } from 'src/tags/tag.entity';

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

  @IsArray()
  readonly tags: TagEntity[];
}
