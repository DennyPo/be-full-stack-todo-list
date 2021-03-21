import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/jwt-auth.guard";
import {CurrentUser} from "../common/decorators/currentUser.decorator";
import {User} from "../user/entities/user.entity";

@Resolver(() => Todo)
@UseGuards(GqlAuthGuard)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => Todo)
  async createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput, @CurrentUser() user: User) {
    return await this.todoService.create(createTodoInput, user);
  }

  @Query(() => [Todo])
  async findAllCurrentUserTodos(@CurrentUser() user: User) {
    return await this.todoService.findAllByUserId(user.id);
  }

  @Query(() => [Todo])
  async findAllTodosByUserId(@Args('userId') userId: number) {
    return await this.todoService.findAllByUserId(userId);
  }
}
