import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';

import { writeFile } from 'fs';
import { v4 } from 'uuid';
import { promisify } from 'util';
import * as path from 'path';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto, user: User){
    // const user = new User();
    // user.id = 1;
    const blog = new Blog();
    blog.topic = createBlogDto.topic;
    blog.details = createBlogDto.details;
    blog.user = user;
    blog.photo = await this.saveImageToDisk(createBlogDto.photo); //return new filename with ext 
    await this.blogsRepository.save(blog);
    
    return {
      topic: blog.topic,
      photo: blog.photo,
      message: "Blog was created with photo uploaded !!!"
    };
  }

  async findAll(): Promise<Blog[]> {
    // const blogs = await this.blogsRepository.find({
    //   relations: ['user']
    // });

    const blogs = await this.blogsRepository
      .createQueryBuilder('blog')
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

  async saveImageToDisk(baseImage: string) {
    //root path 
    const projectPath = path.resolve('./');

    //upload path of photo
    const uploadPath = `${projectPath}/public/images/`;
    //find image extension

    const ext = baseImage.substring(
      baseImage.indexOf('/') + 1,
      baseImage.indexOf(';base64')
    );

    //random new image name with extension
    let filename = '';
    if (ext === 'svg+xml') {
      filename = `${v4()}.svg`;
    } else {
      filename = `${v4()}.${ext}`;
    }

    //Extract base64 data 
    let imgData = this.decodeBase64Image(baseImage);
    // console.log(imgData);

    //upload file to path
    const writeFileAsync = promisify(writeFile);
    await writeFileAsync(uploadPath + filename, imgData, 'base64');
    //return new filename
    return filename;
  }

  decodeBase64Image(base64Str: string) {
    let matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

    if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 string');
    }

    return matches[2];
  }
}
