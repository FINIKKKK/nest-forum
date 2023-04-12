import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() dto: CategoryDto) {
    return this.categoriesService.createCategory(dto);
  }

  @Get()
  findAll() {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoriesService.getCategoryById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: CategoryDto) {
    return this.categoriesService.updateCategory(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriesService.removeCategory(id);
  }
}
