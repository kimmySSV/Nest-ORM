
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';

@Entity({
    name: 'USER_NEST_ACTIVITY',
})
export class UserActivityEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  USERID: number;

  @Column()
  USER_AGENT: string;

  @Column()
  USER_IP: string;

  @Column()
  AUTH_MODE: string;

  @CreateDateColumn()
  CREATED_AT: Date;


}