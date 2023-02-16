import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { SearchTagDto } from './dto/search-tag.dto';
import { TagDto } from './dto/tag.dto';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagEntity)
    private tagsRepository: Repository<TagEntity>,
  ) {}

  async createTag(dto: TagDto) {
    const tag = await this.tagsRepository.save(dto);
    return tag;
  }

  async getAll() {
    const tags = await this.tagsRepository.find();
    return tags;
  }

  async searchTags(dto: SearchTagDto) {
    const qb = await this.tagsRepository.createQueryBuilder('t');

    qb.limit(dto.limit || 3);

    if (dto.name) {
      await qb.andWhere(`t.name ILIKE :name`);
    }

    await qb.setParameters({
      name: `%${dto.name}%`,
    });

    const [items, count] = await qb.getManyAndCount();

    return { count, items };
  }

  async getTagById(id: number) {
    const tag = await this.tagsRepository.findOne({
      where: {
        id,
      },
    });
    return tag;
  }

  async updateTag(id: number, dto: TagDto) {
    const tag = await this.tagsRepository.update(id, dto);
    return tag;
  }

  async removeTag(id: number) {
    const tag = await this.tagsRepository.delete(id);
    return tag;
  }
}
