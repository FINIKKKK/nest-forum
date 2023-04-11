import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    const tagName = dto.name.toLocaleLowerCase();
    const findTag = await this.tagsRepository.findOne({
      where: { name: tagName },
    });

    if (findTag) {
      throw new HttpException(
        'Такая метка уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const tag = await this.tagsRepository.save({
      ...dto,
      name: tagName,
    });
    return tag;
  }

  async getAll(dto: SearchTagDto) {
    const qb = await this.tagsRepository.createQueryBuilder('tags');

    const limit = dto.limit || 2;
    const page = dto.page || 2;

    if (dto.limit) {
      qb.take(dto.limit);
    }
    if (dto.page) {
      qb.skip((page - 1) * limit);
    }

    if (dto.search) {
      qb.where('LOWER(tags.name) LIKE LOWER(:name)', {
        name: `%${dto.search}%`,
      });
    }

    const [items, total] = await qb
      .orderBy('tags.questionCount', 'DESC')
      .getManyAndCount();

    return { total, items };
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
