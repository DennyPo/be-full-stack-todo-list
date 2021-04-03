import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType()
@Entity()
export class Refresh {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => Int)
  @Column()
  userId: number;

  @Field()
  @Column()
  token: string;
}
