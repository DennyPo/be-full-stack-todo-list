import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import { CreateRefreshInput } from './dto/create-refresh.input';
import { UpdateRefreshInput } from './dto/update-refresh.input';
import { Repository, UpdateResult } from "typeorm";
import { Refresh } from "./entities/refresh.entity";
import { User } from "../user/entities/user.entity";
import { jwtConstants } from "../config/constants";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class RefreshService {

  constructor(
      @Inject('REFRESH_REPOSITORY')
      private refreshRepository: Repository<Refresh>,
      private jwtService: JwtService,
      private userService: UserService,
      @Inject(forwardRef(() => AuthService))
      private authService: AuthService
) {}

  async create(createRefreshInput: CreateRefreshInput) {
    return await this.refreshRepository.save(createRefreshInput);
  }

  async findOne(refreshToken: string): Promise<Refresh> {
    return await this.refreshRepository.findOne({
      where: {
        token: refreshToken
      }
    });
  }

  async update(token: string, newToken: string): Promise<UpdateResult> {
    return await this.refreshRepository.update(
        { token },
        { token: newToken }
        );
  }

  generateRefreshToken(user: User): string {
    return this.jwtService.sign({ email: user.email, sub: user.id }, jwtConstants.refreshToken);
  }

  async createNewAccessToken(refreshToken: string) {

    // try {
      const decodedToken = this.jwtService.verify(refreshToken, jwtConstants.refreshToken);

      const token = await this.findOne(refreshToken);
      const user = await this.userService.findOneById(decodedToken.sub);

      if (!token || !user) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }

      // const newToken = this.generateRefreshToken(user);

      // await this.update(refreshToken, newToken);

      return {
        accessToken: this.authService.generateAccessToken(user),
        // refreshToken: newToken
      }

    // } catch (error) {

    //   throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    // }
  }
}
