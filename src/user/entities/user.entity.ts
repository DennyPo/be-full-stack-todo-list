import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 500 })
  email: string;

  @Field()
  @Column({ length: 100, nullable: true, default: '' })
  name: string;

  @Field()
  @Column()
  password?: string;
}
