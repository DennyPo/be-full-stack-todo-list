import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RefreshService } from './refresh.service';
import { Refresh } from './entities/refresh.entity';
import { CreateRefreshInput } from './dto/create-refresh.input';
import { UpdateRefreshInput } from './dto/update-refresh.input';
import { LogIn } from "../auth/entities/login.entity";

@Resolver(() => Refresh)
export class RefreshResolver {
  constructor(private readonly refreshService: RefreshService) {}

  @Query(returns => LogIn)
  async refreshToken(@Args('refreshToken') refreshToken: string) {
    return await this.refreshService.createNewAccessToken(refreshToken);
  }
}
