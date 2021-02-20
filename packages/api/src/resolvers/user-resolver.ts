import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Credentials, NewUser, User } from './models/user';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PrismaClient } from '@prisma/client';

@Resolver()
export class UserResolver {
  constructor(private prisma: PrismaClient) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => String)
  async signup(
    @Args() { email, firstName, lastName, password }: NewUser,
  ): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hash,
      },
    });

    return jwt.sign(user, 'supersecret');
  }

  @Mutation(() => String)
  async login(@Args() { email, password }: Credentials): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new Error('Unable to Login');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Unable to Login');

    return jwt.sign(user, 'supersecret');
  }
}
