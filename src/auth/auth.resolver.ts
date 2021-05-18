import { AuthService } from './auth.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LogIn } from './models/login.model';
import { User } from '../user/entities/user.entity';
import { CreateUserInput } from '../user/dto/create-user.input';
import { Message } from '../common/types/entities';
import { RefreshService } from '../refresh/refresh.service';
import { CurrentUser } from '../common/decorators/currentUser.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './jwt-auth.guard';

@Resolver(() => LogIn)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly refreshService: RefreshService,
  ) {}

  @Query(() => LogIn)
  async login(
    @Args('loginUserInput') loginUserInput: CreateUserInput,
  ): Promise<LogIn> {
    return this.authService.login(loginUserInput);
  }

  @Mutation(() => User)
  async signUp(
    @Args('signUpUserInput') signUpUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.authService.signUp(signUpUserInput);
  }

  @Mutation(() => Message)
  @UseGuards(GqlAuthGuard)
  async logout(
    @Args('refreshToken') refreshToken: string,
    @CurrentUser() user: User,
  ): Promise<Message> {
    return await this.refreshService.delete(refreshToken, user.id);
  }
}
