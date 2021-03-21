import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { DatabaseModule } from "../database/database.module";
import { todoProviders } from "./todo.providers";

@Module({
  imports: [DatabaseModule],
  providers: [
    ...todoProviders,
    TodoResolver,
    TodoService
  ]
})
export class TodoModule {}
