import {forwardRef, Module} from '@nestjs/common';
import { RefreshService } from './refresh.service';
import { RefreshResolver } from './refresh.resolver';
import { DatabaseModule } from "../database/database.module";
import { refreshProviders } from "./refresh.providers";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { AuthModule } from "../auth/auth.module";
import {AuthService} from "../auth/auth.service";

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({}),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule)
  ],
  providers: [
    ...refreshProviders,
    RefreshResolver,
    RefreshService
  ],
  exports: [RefreshService]
})
export class RefreshModule {}
