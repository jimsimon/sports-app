import { ObjectType, Field, ID, ArgsType } from '@nestjs/graphql';

@ObjectType()
export class User {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => ID)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;
}

@ArgsType()
export class NewUser {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@ArgsType()
export class Credentials {
  @Field()
  email: string;

  @Field()
  password: string;
}
