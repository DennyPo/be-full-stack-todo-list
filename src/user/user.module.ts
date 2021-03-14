import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from "./user.providers";
import { DatabaseModule } from "../database/database.module";
import { JwtStrategy } from "../auth/jwt.strategy";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [UserController],
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  exports: [UserService],
  providers: [
    ...userProviders,
    UserService,
    JwtStrategy
  ]
})
export class UserModule {}
