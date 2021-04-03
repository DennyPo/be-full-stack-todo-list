import {Inject, Injectable} from '@nestjs/common';
import { CreateRefreshInput } from './dto/create-refresh.input';
import { UpdateRefreshInput } from './dto/update-refresh.input';
import { Repository } from "typeorm";
import { Refresh } from "./entities/refresh.entity";

@Injectable()
export class RefreshService {

  constructor(
      @Inject('REFRESH_REPOSITORY')
      private refreshRepository: Repository<Refresh>
  ) {}

  async create(createRefreshInput: CreateRefreshInput) {
    return await this.refreshRepository.save(createRefreshInput);
  }
}
