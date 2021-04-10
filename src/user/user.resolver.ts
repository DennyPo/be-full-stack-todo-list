import { Query, Resolver} from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/currentUser.decorator";


@Resolver(of => User)
@UseGuards(GqlAuthGuard)
export class UserResolver{
    constructor(private readonly userService: UserService) {}

    @Query(returns => [User])
    async users(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Query(returns => User)
    async currentUser(@CurrentUser() currentUser: User): Promise<User> {

        return currentUser;
    }
}
