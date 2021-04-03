import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRefreshInput {
  @Field(() => Int)
  userId: number;

  @Field()
  token: string;
}
