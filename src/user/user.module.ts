import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthModule } from '../auth/auth.module';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  exports: [UserService],
  providers: [UserService, JwtStrategy, UserResolver],
})
export class UserModule {}
