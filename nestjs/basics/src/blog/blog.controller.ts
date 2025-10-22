import { Controller, Get, Param } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @Get()
  findAll() {
    return this.blogService.findAll();
  }
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.blogService.findById(+id);
  }
  @Get('uniqueKey/:key')
  findByKey(@Param('key') key: string) {
    return this.blogService.findByUniqueKey(key);
  }
}
