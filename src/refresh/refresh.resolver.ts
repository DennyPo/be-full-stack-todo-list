import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RefreshService } from './refresh.service';
import { Refresh } from './entities/refresh.entity';
import { CreateRefreshInput } from './dto/create-refresh.input';
import { UpdateRefreshInput } from './dto/update-refresh.input';

@Resolver(() => Refresh)
export class RefreshResolver {
  constructor(private readonly refreshService: RefreshService) {}

  // @Mutation(() => Refresh)
  // createRefresh(@Args('createRefreshInput') createRefreshInput: CreateRefreshInput) {
  //   return this.refreshService.create(createRefreshInput);
  // }
  //
  // @Query(() => [Refresh], { name: 'refresh' })
  // findAll() {
  //   return this.refreshService.findAll();
  // }
  //
  // @Query(() => Refresh, { name: 'refresh' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.refreshService.findOne(id);
  // }
  //
  // @Mutation(() => Refresh)
  // updateRefresh(@Args('updateRefreshInput') updateRefreshInput: UpdateRefreshInput) {
  //   return this.refreshService.update(updateRefreshInput.id, updateRefreshInput);
  // }
  //
  // @Mutation(() => Refresh)
  // removeRefresh(@Args('id', { type: () => Int }) id: number) {
  //   return this.refreshService.remove(id);
  // }
}
