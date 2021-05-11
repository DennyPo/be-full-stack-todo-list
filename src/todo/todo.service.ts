import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Repository } from 'typeorm';
import { PaginatedTodos, Todo } from './entities/todo.entity';
import { User } from '../user/entities/user.entity';
import { Message, Pagination } from '../common/types/entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoInput: CreateTodoInput, user: User): Promise<Todo> {
    const newTodo = { ...createTodoInput, userId: user.id };

    return await this.todoRepository.save(newTodo);
  }

  async findAllByUserId(
    userId: number,
    pagination: Pagination,
  ): Promise<PaginatedTodos> {
    const take = pagination.take || 10;
    const skip = pagination.page ? (pagination.page - 1) * take : 0;

    const [list, count] = await this.todoRepository.findAndCount({
      where: { userId },
      order: {
        id: 'DESC',
      },
      take,
      skip,
    });

    return { list, count };
  }

  async updateTodo(
    updateTodoInput: UpdateTodoInput,
    userId: number,
  ): Promise<Todo> {
    const { id, title, description } = updateTodoInput;

    const { affected } = await this.todoRepository.update(
      { id, userId },
      { title, description },
    );

    if (!affected) {
      throw new HttpException('Can not find todo item', HttpStatus.NOT_FOUND);
    }

    return await this.todoRepository.findOne(id);
  }

  async deleteTodo(id: number, userId: number): Promise<Message> {
    const result = await this.todoRepository.delete({ id, userId });

    if (!result.affected) {
      throw new HttpException('Can not find todo item', HttpStatus.NOT_FOUND);
    }

    return { message: 'Successfully deleted' };
  }
}
