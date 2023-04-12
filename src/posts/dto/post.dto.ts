import { OutputBlockData } from 'src/questions/dto/question.dto';
import { TagEntity } from 'src/tags/tag.entity';

export class PostDto {
  readonly title: string;
  readonly body: OutputBlockData[];
  readonly categoryId: number;
  tags: TagEntity[];
}
