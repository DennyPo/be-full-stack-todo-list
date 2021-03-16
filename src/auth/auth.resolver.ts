import { AuthService } from "./auth.service";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { LogIn } from "./entities/login.entity";

@Resolver(of => LogIn)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Query(returns => LogIn)
    async login(@Args('email') email: string, @Args('password') password: string) {
        return this.authService.login({ email, password });
    }
}
