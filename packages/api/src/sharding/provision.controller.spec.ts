import { Test, TestingModule } from '@nestjs/testing';
import { ProvisionController } from './provision.controller';
import { ShardingModule } from './sharding.module';

describe('ProvisionController', () => {
  let controller: ProvisionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ShardingModule],
    }).compile();

    controller = module.get<ProvisionController>(ProvisionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
