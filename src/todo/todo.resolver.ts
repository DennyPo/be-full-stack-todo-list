import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { PaginatedTodos, Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/currentUser.decorator';
import { User } from '../user/entities/user.entity';
import { Message, Pagination } from '../common/types/entities';

@Resolver(() => Todo)
@UseGuards(GqlAuthGuard)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => Todo)
  async createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInput,
    @CurrentUser() user: User,
  ): Promise<Todo> {
    return await this.todoService.create(createTodoInput, user);
  }

  @Query(() => PaginatedTodos)
  async findAllCurrentUserTodos(
    @CurrentUser() user: User,
    @Args('pagination', { nullable: true, defaultValue: { page: 1, take: 10 } })
    pagination: Pagination,
  ): Promise<PaginatedTodos> {
    return await this.todoService.findAllByUserId(user.id, pagination);
  }

  @Query(() => PaginatedTodos)
  async findAllTodosByUserId(
    @Args('userId') userId: number,
    @Args('pagination', { nullable: true, defaultValue: { page: 1, take: 10 } })
    pagination: Pagination,
  ): Promise<PaginatedTodos> {
    return await this.todoService.findAllByUserId(userId, pagination);
  }

  @Mutation(() => Todo)
  async updateTodo(
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
    @CurrentUser() currentUser: User,
  ): Promise<Todo> {
    return this.todoService.updateTodo(updateTodoInput, currentUser.id);
  }

  @Mutation(() => Message)
  async deleteTodo(
    @Args('id') id: number,
    @CurrentUser() currentUser: User,
  ): Promise<Message> {
    return await this.todoService.deleteTodo(id, currentUser.id);
  }
}
