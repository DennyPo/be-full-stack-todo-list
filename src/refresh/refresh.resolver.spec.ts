import { Test, TestingModule } from '@nestjs/testing';
import { RefreshResolver } from './refresh.resolver';
import { RefreshService } from './refresh.service';

describe('RefreshResolver', () => {
  let resolver: RefreshResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshResolver, RefreshService],
    }).compile();

    resolver = module.get<RefreshResolver>(RefreshResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
