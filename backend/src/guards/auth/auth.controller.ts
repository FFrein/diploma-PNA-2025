import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { role } from '@prisma/client';
import { AuthLoginDto } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Login to the system' })
  @ApiResponse({ status: 200, description: 'Successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: AuthLoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBody({ schema: { example: { refresh_token: 'your_refresh_token' } } })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshToken(@Body() body: { refresh_token: string }) {
    return this.authService.refreshToken(body.refresh_token);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile fetched successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const data = await this.usersService.findByEmail(req.user.email);
    const { password, ...userWithoutPassword } = data!;
    return userWithoutPassword;
  }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    schema: {
      example: {
        FIO: 'FIO',
        login: 'login',
        phone: 'phone',
        email: 'email',
        password: 'password',
      },
    },
  })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post('registration')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create({ ...createUserDto, role: role.user });
  }

  @Post('/forgot-password')
  forgotPassword(@Body() forgotPassword: { email: string }) {
    return this.authService.forgotPassword(forgotPassword.email);
  }
}
