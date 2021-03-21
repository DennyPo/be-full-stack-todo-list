import { Inject, Injectable} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
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

    async create(createUserInput: CreateUserInput) {

      const password: string = await hash(createUserInput.password);

      const { password: passwd, ...result} = await this.userRepository.save({...createUserInput, password });

      return result;
    }

    async findAll() {
        return await this.userRepository.find({ select: ["email", "id"] });
    }

    async findOneByEmail(email: string) {
        return await this.userRepository.findOne({
            where: { email }
        });
    }

    async findOneById(id: number) {
        return await this.userRepository.findOne({
            where: { id },
            select: ["id", "email"]
        });
    }
}
