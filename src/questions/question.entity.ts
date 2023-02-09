import { Base } from "src/utils/base";
import { Column, Entity } from "typeorm";
import { OutputBlockData } from "./dto/question.dto";

@Entity('questions')
export class QuestionEntity extends Base {
  @Column()
  title: string;

  @Column({ type: 'jsonb' })
  body: OutputBlockData[];
}
