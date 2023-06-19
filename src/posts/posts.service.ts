import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/categories/category.entity';
import { CommentEntity } from 'src/comments/comment.entity';
import { FilesService } from 'src/files/files.service';
import { TagEntity } from 'src/tags/tag.entity';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { ParamsPostDto } from './dto/params-post.dto';
import { PostDto } from './dto/post.dto';
import { PostEntity } from './post.entity';
import * as translit from 'transliteration';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    @InjectRepository(CategoryEntity)
    private categoriesRepository: Repository<CategoryEntity>,
    @InjectRepository(TagEntity)
    private tagsRepository: Repository<TagEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(CommentEntity)
    private commentsRepository: Repository<CommentEntity>,
  ) {}

  // createPost ----------------------------------------------
  async createPost(dto: PostDto, userId: number) {
    const slug = translit.slugify(dto.title);
    const description = dto.body.find((obj) => obj.type === 'paragraph')?.data
      ?.text;

    const category = await this.categoriesRepository.findOne({
      where: { id: dto.categoryId },
    });
    category.postsCount++;
    await this.categoriesRepository.save(category);

    const tags = dto.tags.map((tag) => {
      tag.postsCount++;
      return tag;
    });
    await this.tagsRepository.save(tags);

    const post = await this.postsRepository.save({
      ...dto,
      slug,
      description: description || '',
      user: {
        id: userId,
      },
      category: {
        id: dto.categoryId,
      },
    });
    return post;
  }

  // getAllPosts ----------------------------------------------
  async getAllPosts(dto: ParamsPostDto) {
    const qb = await this.postsRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.user', 'user')
      .leftJoinAndSelect('posts.category', 'category')
      .leftJoinAndSelect('posts.tags', 'tags');

    const limit = dto.limit || 2;
    const page = dto.page || 2;

    if (dto.limit) {
      qb.take(dto.limit);
    }
    if (dto.page) {
      qb.skip((page - 1) * limit);
    }

    if (dto.orderBy === 'popular') {
      qb.orderBy('posts.views', 'DESC');
    } else {
      qb.orderBy('posts.createdAt', 'DESC');
    }

    if (dto.tagBy) {
      const tag = dto.tagBy;
      qb.where('tag.name = :tag', { tag });
    }

    if (dto.userId && !dto.favorites) {
      qb.where('user.id = :user', {
        user: dto.userId,
      });
    }

    if (dto.favorites && dto.userId) {
      const user = await this.usersRepository.findOne({
        where: { id: dto.userId },
      });
      if (!!user.favorites.length) {
        qb.where('posts.id IN (:...ids)', { ids: user.favorites });
      } else {
        qb.where('1=0');
      }
    }

    if (dto.searchBy) {
      qb.andWhere('LOWER(posts.title) LIKE LOWER(:title)', {
        title: `%${dto.searchBy}%`,
      });
    }

    const [posts, total] = await qb.getManyAndCount();

    if (dto.isShort) {
      const items = posts.map((obj) => {
        delete obj.body;
        delete obj.image;
        delete obj.views;
        delete obj.updated;
        delete obj.tags;
        delete obj.user;
        delete obj.commentsCount;
        return {
          ...obj,
          category: {
            id: obj.category.id,
            label: obj.category.label,
            value: obj.category.value,
          },
        };
      });
      return { total, items };
    }

    const items = posts.map((obj) => {
      delete obj.body;
      return {
        ...obj,
        tags: obj.tags.map((item) => ({
          id: item.id,
          name: item.name,
        })),
      };
    });
    return { total, items };
  }

  // getPostById ----------------------------------------------
  async getPostById(id: number) {
    await this.postsRepository
      .createQueryBuilder('posts')
      .whereInIds(id)
      .update()
      .set({
        views: () => 'views + 1',
      })
      .execute();

    const post = await this.postsRepository
      .createQueryBuilder('posts')
      .whereInIds(id)
      .leftJoinAndSelect('postsq.user', 'user')
      .leftJoinAndSelect('posts.category', 'category')
      .leftJoinAndSelect('posts.tags', 'tags')
      .getOne();

    return {
      ...post,
      user: {
        id: post.user.id,
        login: post.user.login,
        name: post.user.name,
        avatar: post.user.avatar,
      },
    };
  }

  // updatePost ----------------------------------------------
  async updatePost(id: number, dto: PostDto) {
    const post = await this.postsRepository
      .createQueryBuilder('posts')
      .whereInIds(id)
      .leftJoinAndSelect('posts.category', 'category')
      .leftJoinAndSelect('posts.tags', 'tags')
      .getOne();

    if (dto.tags) {
      const newTags = dto.tags.filter(
        (tag) => !post.tags.find((t) => t.id === tag.id),
      );
      const oldTags = post.tags.filter(
        (tag) => !dto.tags.find((t) => t.id === tag.id),
      );

      if (newTags.length > 0) {
        newTags.forEach((tag) => {
          tag.postsCount++;
        });
      }
      if (oldTags.length > 0) {
        oldTags.forEach((tag) => {
          tag.postsCount--;
        });
      }

      post.tags = dto.tags;
      delete dto.tags;

      if (oldTags.length > 0) {
        await this.tagsRepository.save(oldTags);
      }
      if (newTags.length > 0) {
        await this.tagsRepository.save(newTags);
      }
    }

    if (dto.categoryId) {
      if (post.category.id !== dto.categoryId) {
        const oldCategory = post.category;
        const newCategory = await this.categoriesRepository.findOne({
          where: { id: dto.categoryId },
        });

        if (oldCategory) {
          oldCategory.postsCount--;
          await this.categoriesRepository.save(oldCategory);
        }
        if (newCategory) {
          newCategory.postsCount++;
          await this.categoriesRepository.save(newCategory);
        }
      }
    }

    post.updated = new Date();
    await this.postsRepository.save(post);
    await this.postsRepository.update(id, dto);
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
