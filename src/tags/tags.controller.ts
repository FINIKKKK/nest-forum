import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { SearchTagDto } from './dto/search-tag.dto';
import { TagDto } from './dto/tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() dto: TagDto) {
    return this.tagsService.createTag(dto);
  }

  @Get()
  findAll(@Query() dto: SearchTagDto) {
    return this.tagsService.getAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tagsService.getTagById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: TagDto) {
    return this.tagsService.updateTag(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tagsService.removeTag(id);
  }
}
