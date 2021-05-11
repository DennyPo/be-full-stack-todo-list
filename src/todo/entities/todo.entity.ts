import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Todo {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field()
  @Column({ length: 100 })
  title: string;

  @Field()
  @Column({ length: 500 })
  description: string;
}

@ObjectType()
export class PaginatedTodos {
  @Field(() => [Todo])
  list: Todo[];

  @Field(() => Int)
  count: number;
}
