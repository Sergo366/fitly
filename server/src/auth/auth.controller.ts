import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { SigninDto } from './dtos/signin.dto';

import { Public } from './public.decorator';
import { RtGuard } from './rt.guard';
import { GetCurrentUserId } from './decorators/get-current-user-id.decorator';
import { GetCurrentUser } from './decorators/get-current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() body: SignupDto) {
    return await this.authService.signup(body);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() body: SigninDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return await this.authService.login(user);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: string) {
    return await this.authService.logout(userId);
  }

  @UseGuards(RtGuard)
  @Post('refreshToken')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') rt: string,
  ) {
    return await this.authService.refreshTokens(userId, rt);
  }
}
