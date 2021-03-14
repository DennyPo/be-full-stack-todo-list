import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from "./local-auth.guard";

@Controller('auth')
@UseGuards(LocalAuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() payload) {
    return this.authService.login(payload);
  }
}
