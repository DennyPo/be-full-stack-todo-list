import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { RefreshModule } from '../refresh/refresh.module';

@Module({
  providers: [AuthService, AuthResolver],
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({}),
    forwardRef(() => RefreshModule),
  ],
  exports: [AuthService],
})
export class AuthModule {}
