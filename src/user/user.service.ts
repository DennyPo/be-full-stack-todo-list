import { BadRequestException, Inject, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  async create(createUserDto: CreateUserDto) {
      const password: string = await hash(createUserDto.password);

      const { password: passwd, ...user}: CreateUserDto = await this.userRepository.save({...createUserDto, password });

      return user;
  }

  async findAll() {
    return await this.userRepository.find({ select: ["email", "id"] });
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: { email }
    });
  }

  // async update(id: number, updateUserDto: UpdateUserDto) {
  //   return await this.userRepository.update(id, updateUserDto);
  // }
  //
  // async delete(id: number) {
  //   return await this.userRepository.delete(id);
  // }
}
