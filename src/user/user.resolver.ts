import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { PaginatedUsers, User } from './entities/user.entity';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/currentUser.decorator';
import { Pagination } from '../common/types/entities';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => PaginatedUsers)
  async users(
    @Args('pagination', { nullable: true, defaultValue: { page: 1, take: 10 } })
    pagination: Pagination,
  ): Promise<PaginatedUsers> {
    return await this.userService.findAll(pagination);
  }

  @Query(() => User)
  async currentUser(@CurrentUser() currentUser: User): Promise<User> {
    const user = await this.userService.findOneById(currentUser.id);

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
