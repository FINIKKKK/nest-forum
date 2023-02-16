import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [TypeOrmModule.forFeature([TagEntity])],
  
})
export class TagsModule {}
