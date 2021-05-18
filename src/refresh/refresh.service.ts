import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateRefreshInput } from './dto/create-refresh.input';
import { Repository, UpdateResult } from 'typeorm';
import { Refresh } from './entities/refresh.entity';
import { User } from '../user/entities/user.entity';
import { jwtConstants } from '../config/constants';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { LogIn } from '../auth/models/login.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../common/types/entities';

@Injectable()
export class RefreshService {
  constructor(
    @InjectRepository(Refresh)
    private refreshRepository: Repository<Refresh>,
    private jwtService: JwtService,
    private userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async create(createRefreshInput: CreateRefreshInput): Promise<Refresh> {
    return await this.refreshRepository.save(createRefreshInput);
  }

  async findOne(refreshToken: string): Promise<Refresh> {
    return await this.refreshRepository.findOne({
      where: {
        token: refreshToken,
      },
    });
  }

  async update(token: string, newToken: string): Promise<UpdateResult> {
    return await this.refreshRepository.update({ token }, { token: newToken });
  }

  async delete(token: string, userId: number): Promise<Message> {
    const { affected } = await this.refreshRepository.delete({ token, userId });

    if (!affected) {
      throw new HttpException(
        'Can not find refresh token',
        HttpStatus.NOT_FOUND,
      );
    }

    return { message: 'Successfully deleted' };
  }

  generateRefreshToken(user: User): string {
    return this.jwtService.sign(
      { email: user.email, sub: user.id },
      jwtConstants.refreshToken,
    );
  }

  async createNewAccessToken(refreshToken: string): Promise<LogIn> {
    const decodedToken = this.jwtService.verify(
      refreshToken,
      jwtConstants.refreshToken,
    );

    const token = await this.findOne(refreshToken);
    const user = await this.userService.findOneById(decodedToken.sub);

    if (!token || !user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return {
      accessToken: this.authService.generateAccessToken(user),
    };
  }
}
