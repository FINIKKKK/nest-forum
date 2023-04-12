import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/users/user.decorator';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/create-comment.dto';
import { ParamsCommentDto } from './dto/params-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CommentDto, @User() userId: number) {
    return this.commentsService.createComment(dto, userId);
  }

  @Get()
  findAll(@Query() dto: ParamsCommentDto) {
    return this.commentsService.getAllComments(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentsService.getCommentById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: CommentDto) {
    return this.commentsService.updateComment(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commentsService.removeComment(id);
  }
}
