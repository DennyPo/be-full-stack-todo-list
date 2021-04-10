import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { comparePasswords } from "../utils";
import { CreateUserInput } from "../user/dto/create-user.input";
import { jwtConstants } from "../config/constants";
import {RefreshService} from "../refresh/refresh.service";
import { LogIn } from "./entities/login.entity";
import { User } from "../user/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
      private userService: UserService,
      private jwtService: JwtService,
      private refreshService: RefreshService
  ) {}

  async validateUser(payload: any): Promise<any> {
    const user = await this.userService.findOneById(payload.sub);

    if (user) return user;

    return null;
  }

  async login(user: CreateUserInput): Promise<LogIn> {

    const userDb = await this.userService.findOneByEmail(user.email);

    if (!userDb || !await comparePasswords(user.password, userDb.password)) {
      throw new HttpException('Wrong email or password', HttpStatus.NOT_FOUND);
    }

    const tokens = {
      accessToken: this.generateAccessToken(userDb),
      refreshToken: this.refreshService.generateRefreshToken(userDb),
    };

    await this.refreshService.create({ userId: userDb.id, token: tokens.refreshToken });

    return tokens;
  }

  generateAccessToken(user: User): string {
    return this.jwtService.sign({ email: user.email, sub: user.id }, jwtConstants.accessToken);
  }

  async signUp(user: CreateUserInput): Promise<User> {

    const userDb = await this.userService.findOneByEmail(user.email);

    if (userDb) {
      throw new HttpException('User with this email already exists', HttpStatus.CONFLICT);
    }

    return this.userService.create(user);
  }
}
