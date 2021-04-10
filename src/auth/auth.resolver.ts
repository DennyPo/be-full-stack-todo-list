import { AuthService } from "./auth.service";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { LogIn } from "./entities/login.entity";
import { User } from "../user/entities/user.entity";
import { CreateUserInput } from "../user/dto/create-user.input";

@Resolver(of => LogIn)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Query(returns => LogIn)
    async login(@Args('loginUserInput') loginUserInput: CreateUserInput): Promise<LogIn> {
        return this.authService.login(loginUserInput);
    }

    @Mutation(returns => User)
    async signUp(@Args('signUpUserInput') signUpUserInput: CreateUserInput): Promise<User> {
        return await this.authService.signUp(signUpUserInput);
    }
}
