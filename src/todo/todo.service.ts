import {Inject, Injectable} from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Repository } from "typeorm";
import { Todo } from "./entities/todo.entity";
import { User } from "../user/entities/user.entity";

@Injectable()
export class TodoService {

  constructor(
      @Inject('TODO_REPOSITORY')
      private todoRepository: Repository<Todo>
  ) {}

  async create(createTodoInput: CreateTodoInput, user: User) {

    const newTodo = { ...createTodoInput, userId: user.id };

    return await this.todoRepository.save(newTodo);
  }

  async findAllByUserId(userId: number) {
    return await this.todoRepository.find({ where: { userId } });
  }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} todo`;
  // }
  //
  // update(id: number, updateTodoInput: UpdateTodoInput) {
  //   return `This action updates a #${id} todo`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} todo`;
  // }
}
