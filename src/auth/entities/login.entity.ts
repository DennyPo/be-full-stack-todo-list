import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class LogIn {
    @Field()
    accessToken: string;

    @Field()
    refreshToken: string;
}
