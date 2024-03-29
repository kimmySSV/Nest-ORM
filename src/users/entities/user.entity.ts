import { Blog } from 'src/blogs/entities/blog.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({
    name: 'user',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true
  })
  email: string;

  @Column({
    select: false
  })
  password: string;

  @Column({default: 'member'})
  permission: string;

  //Relation
  @OneToMany(() => Blog, blog => blog.user)
  blogs: Blog[];

}