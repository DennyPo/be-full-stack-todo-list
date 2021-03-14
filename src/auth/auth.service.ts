import { Injectable } from '@nestjs/common';
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
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
