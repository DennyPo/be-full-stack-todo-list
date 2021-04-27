import { forwardRef, Module } from '@nestjs/common';
import { RefreshService } from './refresh.service';
import { RefreshResolver } from './refresh.resolver';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Refresh } from './entities/refresh.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Refresh]),
    JwtModule.register({}),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
  ],
  providers: [RefreshResolver, RefreshService],
  exports: [RefreshService],
})
export class RefreshModule {}
