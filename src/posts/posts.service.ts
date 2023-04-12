import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/categories/category.entity';
import { CommentEntity } from 'src/comments/comment.entity';
import { TagEntity } from 'src/tags/tag.entity';
import { Repository } from 'typeorm';
import { PostDto } from './dto/post.dto';
import { PostEntity } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    @InjectRepository(CategoryEntity)
    private categoriesRepository: Repository<CategoryEntity>,
    @InjectRepository(TagEntity)
    private tagsRepository: Repository<TagEntity>,
    @InjectRepository(CommentEntity)
    private commentsRepository: Repository<CommentEntity>,
  ) {}

  // createPost ----------------------------------------------
  async createPost(dto: PostDto, userId: number) {
    const category = await this.categoriesRepository.findOne({
      where: { id: dto.categoryId },
    });
    category.postsCount++;
    await this.categoriesRepository.save(category);

    const tags = dto.tags.map((tag) => {
      tag.questionCount++;
      return tag;
    });
    await this.tagsRepository.save(tags);

    const post = await this.postsRepository.save({
      ...dto,
      user: {
        id: userId,
      },
    });
    return post;
  }

  // getAllPosts ----------------------------------------------
  async getAllPosts() {
    const posts = await this.postsRepository.find();
    return posts;
  }

  // getPostById ----------------------------------------------
  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });
    return post;
  }

  // updatePost ----------------------------------------------
  async updatePost(id: number, dto: PostDto) {
    const post = await this.postsRepository.update(id, dto);
    return post;
  }

  // removePost ----------------------------------------------
  async removePost(id: number) {
    const post = await this.postsRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.category', 'category')
      .leftJoinAndSelect('posts.tags', 'tags')
      .getOne();

    const category = post.category;
    category.postsCount--;
    await this.categoriesRepository.save(category);

    const tags = post.tags.map((tag) => {
      tag.postsCount--;
      return tag;
    });
    await this.tagsRepository.save(tags);

    await this.commentsRepository.delete({ post: { id } });

    await this.postsRepository.delete(id);
  }
}
