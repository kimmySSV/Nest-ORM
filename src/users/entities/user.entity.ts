
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({
    name: 'USER_NEST_LOGIN',
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

  // @Column({default: Date() })
  // lastLogin: Date;


}