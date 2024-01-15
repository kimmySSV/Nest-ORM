import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({
    name: 'blog',
})
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  topic: string;

  @Column()
  details: string;

  @ManyToOne(() => User, user => user.blogs)
  user: User;

}