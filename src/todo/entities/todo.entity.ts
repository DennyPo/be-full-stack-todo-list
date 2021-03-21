import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Todo {

  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => Int)
  @Column()
  userId: number;

  @Field()
  @Column({ length: 100 })
  title: string;

  @Field()
  @Column({ length: 500 })
  description: string;
}
