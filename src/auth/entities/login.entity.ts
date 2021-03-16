import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class LogIn {
    @Field()
    access_token: string;
}
