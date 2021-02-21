import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { ShardingModule } from '../sharding/sharding.module';

@Module({
  imports: [ShardingModule],
  providers: [UserResolver],
})
export class UserModule {}
