import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppContext } from './context';
import { Credentials, NewUser, User } from './models/user';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(@Context() ctx: AppContext): Promise<User[]> {
    try {
      return ctx.prisma.user.findMany();
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => String)
  async signup(
    @Args() { email, firstName, lastName, password }: NewUser,
    @Context() { prisma }: AppContext,
  ): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
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
  async login(
    @Args() { email, password }: Credentials,
    @Context() { prisma }: AppContext,
  ): Promise<string> {
    const user = await prisma.user.findOne({
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
