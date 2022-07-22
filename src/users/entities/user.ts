import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4
  @Column()
  login: string;
  @Exclude()
  @Column()
  password: string;
  @Column()
  version: number; // integer number, increments on update
  @Column()
  createdAt: number; // timestamp of creation
  @Column()
  updatedAt: number; // timestamp of last update
}
