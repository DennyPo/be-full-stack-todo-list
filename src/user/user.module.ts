import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userProviders } from "./user.providers";
import { DatabaseModule } from "../database/database.module";
import { JwtStrategy } from "../auth/jwt.strategy";
import { AuthModule } from "../auth/auth.module";
import { UserResolver } from "./user.resolver";

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  exports: [UserService],
  providers: [
    ...userProviders,
    UserService,
    JwtStrategy,
    UserResolver
  ]
})
export class UserModule {}
