import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/users/user.decorator';
import { ParamsPostDto } from './dto/params-post.dto';
import { PostDto } from './dto/post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: PostDto, @User() userId: number) {
    return this.postsService.createPost(dto, userId);
  }

  @Get()
  findAll(@Query() dto: ParamsPostDto) {
    return this.postsService.getAllPosts(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postsService.getPostById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: PostDto) {
    return this.postsService.updatePost(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postsService.removePost(id);
  }
}
