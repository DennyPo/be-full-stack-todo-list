import { CreateRefreshInput } from './create-refresh.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRefreshInput extends PartialType(CreateRefreshInput) {
  @Field(() => Int)
  id: number;
}
