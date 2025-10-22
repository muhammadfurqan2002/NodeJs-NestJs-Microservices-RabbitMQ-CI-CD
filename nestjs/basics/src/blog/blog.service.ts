import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
  private readonly blogs = [
    {
      id: 1,
      blogTitle: 'blog 1',
      blogUniqueKey: 'blogUniqueKey1',
    },
    {
      id: 2,
      blogTitle: 'blog 2',
      blogUniqueKey: 'blogUniqueKey2',
    },
    {
      id: 3,
      blogTitle: 'blog 3',
      blogUniqueKey: 'blogUniqueKey3',
    },
  ];

  findAll() {
    return this.blogs;
  }
  findById(id: number) {
    return this.blogs.find((blog) => blog.id === id);
  }

  findByUniqueKey(key: string) {
    return this.blogs.find((blog) => blog.blogUniqueKey === key);
  }
}
