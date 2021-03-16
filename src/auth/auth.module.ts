import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../config/constants";
import { AuthResolver } from "./auth.resolver";

@Module({
  providers: [AuthService, AuthResolver],
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  exports: [AuthService]
})
export class AuthModule {}
