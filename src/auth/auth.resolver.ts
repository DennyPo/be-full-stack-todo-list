import { AuthService } from "./auth.service";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { LogIn } from "./entities/login.entity";
import { User } from "../user/entities/user.entity";

@Resolver(of => LogIn)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Query(returns => LogIn)
    async login(@Args('email') email: string, @Args('password') password: string) {
        return this.authService.login({ email, password });
    }

    @Mutation(returns => User)
    async signUp(@Args('email') email: string, @Args('password') password: string) {
        return await this.authService.signUp({ email, password });
    }
}
