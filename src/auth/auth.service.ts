import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { comparePasswords } from "../utils";
import { CreateUserInput } from "../user/dto/create-user.input";

@Injectable()
export class AuthService {
  constructor(
      private userService: UserService,
      private jwtService: JwtService
  ) {}

  async validateUser(payload: any): Promise<any> {
    const user = await this.userService.findOneById(payload.sub);

    if (user) return user;

    return null;
  }

  async login(user: CreateUserInput) {

    const userDb = await this.userService.findOneByEmail(user.email);

    if (!userDb || !await comparePasswords(user.password, userDb.password)) {
      throw new HttpException('Wrong email or password', HttpStatus.NOT_FOUND);
    }

    const payload = { email: userDb.email, sub: userDb.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(user: CreateUserInput) {

    const userDb = await this.userService.findOneByEmail(user.email);

    if (userDb) {
      throw new HttpException('User with this email are already exists', HttpStatus.CONFLICT);
    }

    return this.userService.create(user);
  }
}
