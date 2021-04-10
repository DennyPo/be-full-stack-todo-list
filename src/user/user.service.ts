import { Inject, Injectable} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

// Utils

import { hash } from "../utils";

@Injectable()
export class UserService {
  constructor(
      @Inject('USER_REPOSITORY')
      private userRepository: Repository<User>
  ) {}

    async create(createUserInput: CreateUserInput): Promise<User> {

      const password: string = await hash(createUserInput.password);

      const { password: passwd, ...result} = await this.userRepository.save({...createUserInput, password });

      return result;
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find({
            select: ["email", "id"],
            order: {
                id: 'DESC'
            }
        });
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({
            where: { email }
        });
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne({
            where: { id },
            select: ["id", "email"]
        });
    }
}
