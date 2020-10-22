import { Container } from 'inversify'
import { PrismaClient } from '@prisma/client'
import { asyncLocalStorage} from "./sharding/async-local-storage";

export const container = new Container()
container.bind(PrismaClient).toDynamicValue(() => asyncLocalStorage.getStore().tenant)
