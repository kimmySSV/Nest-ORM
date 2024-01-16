import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ){}

  create(createBlogDto: CreateBlogDto) {
    return 'This action adds a new blog';
  }

  async findAll(): Promise<Blog[]> {
    // const blogs = await this.blogsRepository.find({
    //   relations: ['user']
    // });

    const blogs = await this.blogsRepository.createQueryBuilder('blog')
    .innerJoinAndSelect('blog.user', 'user')
    .select(['blog', 'user.id', 'user.fullname'])
    .getMany();
    return blogs;
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
