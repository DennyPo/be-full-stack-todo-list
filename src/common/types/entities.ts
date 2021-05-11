import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field()
  message: string;
}

@InputType()
export class Pagination {
  @Field(() => Int, { nullable: true })
  page: number;

  @Field(() => Int, { nullable: true })
  take: number;
}
