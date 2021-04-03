import { Module } from '@nestjs/common';
import { RefreshService } from './refresh.service';
import { RefreshResolver } from './refresh.resolver';
import { DatabaseModule } from "../database/database.module";
import { refreshProviders } from "./refresh.providers";

@Module({
  imports: [DatabaseModule],
  providers: [
    ...refreshProviders,
    RefreshResolver,
    RefreshService
  ],
  exports: [RefreshService]
})
export class RefreshModule {}
