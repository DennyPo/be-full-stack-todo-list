import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { Repository } from 'typeorm';
import { PaginatedUsers, User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

// Utils

import { hash } from '../utils';
import { Pagination } from '../common/types/entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const password: string = await hash(createUserInput.password);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: passwd, ...result } = await this.userRepository.save({
      ...createUserInput,
      password,
    });

    return result;
  }

  async findAll(pagination: Pagination): Promise<PaginatedUsers> {
    const take = pagination.take || 10;
    const skip = pagination.page ? (pagination.page - 1) * take : 0;

    const [list, count] = await this.userRepository.findAndCount({
      select: ['email', 'id', 'name'],
      order: {
        id: 'DESC',
      },
      take,
      skip,
    });

    return { list, count };
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'name'],
    });
  }
}
