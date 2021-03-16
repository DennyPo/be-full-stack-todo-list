import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { User } from "../user/interfaces/user.interface";
import { comparePasswords } from "../utils";

@Injectable()
export class AuthService {
  constructor(
      private userService: UserService,
      private jwtService: JwtService
  ) {}

  async validateUser(payload: User): Promise<any> {
    const user = await this.userService.findOne(payload.email);

    if (user && await comparePasswords(payload.password, user.password)) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async validateLoggedInUser(payload: any): Promise<any> {
    const user = await this.userService.findOne(payload.email);

    if (user) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: User) {

    const userDb = await this.userService.findOne(user.email);

    if (!userDb) {
      throw new HttpException('User doesn`t exist', HttpStatus.NOT_FOUND);
    }

    const payload = { email: userDb.email, sub: userDb.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
