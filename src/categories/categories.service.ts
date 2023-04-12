import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoriesRepository: Repository<CategoryEntity>,
  ) {}

  // createCategory ----------------------------------------------
  async createCategory(dto: CategoryDto) {
    const categories = await this.categoriesRepository.save(dto);
    return categories;
  }

  // getAllCategories ----------------------------------------------
  async getAllCategories() {
    const qb = this.categoriesRepository.createQueryBuilder('categories');
    const categories = qb.orderBy('categories.postsCount', 'DESC').getMany();
    return categories;
  }

  // getCategoryById ----------------------------------------------
  async getCategoryById(id: number) {
    const category = await this.categoriesRepository.findOne({
      where: {
        id,
      },
    });
    return category;
  }

  // updateCategory ----------------------------------------------
  async updateCategory(id: number, dto: CategoryDto) {
    const category = await this.categoriesRepository.update(id, dto);
    return category;
  }

  // removeCategory ----------------------------------------------
  async removeCategory(id: number) {
    const category = await this.categoriesRepository.delete(id);
    return category;
  }
}
