import { TagEntity } from 'src/tags/tag.entity';

export type OutputBlockData = {
  id?: number;
  type: any;
  data: any;
};

export class QuestionDto {
  readonly title: string;
  readonly body: OutputBlockData[];
  readonly tags: TagEntity[];
}
