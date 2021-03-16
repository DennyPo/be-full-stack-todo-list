import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/jwt-auth.guard";


@Resolver(of => User)
@UseGuards(GqlAuthGuard)
export class UserResolver{
    constructor(private readonly userService: UserService) {}

    @Query(returns => [User])
    async users() {
        return await this.userService.findAll();
    }

    @Query(returns => User)
    async user(@Args('email') email: string) {
        const user = await this.userService.findOne(email);

        if (!user) {
            throw new HttpException('User doesn`t exist', HttpStatus.NOT_FOUND);
        }

        const { password, ...result } = user;

        return result;
    }

    @Mutation(returns => User)
    async createUser(@Args('email') email: string, @Args('password') password: string) {
        return await this.userService.create({ email, password });
    }
}
