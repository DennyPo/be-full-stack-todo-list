import { Resolver, Query, Args } from '@nestjs/graphql';
import { RefreshService } from './refresh.service';
import { Refresh } from './entities/refresh.entity';
import { LogIn } from '../auth/models/login.model';

@Resolver(() => Refresh)
export class RefreshResolver {
  constructor(private readonly refreshService: RefreshService) {}

  @Query(() => LogIn)
  async refreshToken(
    @Args('refreshToken') refreshToken: string,
  ): Promise<LogIn> {
    return await this.refreshService.createNewAccessToken(refreshToken);
  }
}
