import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Context } from "./context";
import { Resolver, Mutation, Query, Args, Ctx } from 'type-graphql';
import {Credentials, NewUser, User} from "./models/user";

@Resolver()
export class UserResolver {

  @Query(returns => [User])
  async users(@Ctx() ctx: Context): Promise<User[]> {
    try {
      return ctx.prisma.user.findMany();
    } catch (error) {
      throw error;
    }
  }

  @Mutation(returns => String)
  async signup(@Args() { email, firstName, lastName, password }: NewUser, @Ctx() { prisma }: Context): Promise<String> {
    const hash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hash
      }
    });

    return jwt.sign(user, "supersecret")
  }

  @Mutation(returns => String)
  async login(@Args() {email, password}: Credentials, @Ctx() { prisma }: Context): Promise<String> {
    const user = await prisma.user.findOne({
      where: {
        email
      }
    })

    if (!user) throw new Error('Unable to Login');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Unable to Login');

    return jwt.sign(user, "supersecret")
  }
}
