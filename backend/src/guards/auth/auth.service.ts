import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { sendNewPassword } from 'src/utils/resetPassword.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: 60 * 60 * 24 * 3,
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: 60 * 60 * 24 * 14,
    });

    return { access_token, refresh_token };
  }

  async create(data: {
    role: 'user';
    FIO: string;
    login: string;
    phone: string;
    email: string;
    password: string;
  }) {
    const existingUser = await this.usersService.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      Number(process.env.BCRYPT_SALT!),
    );
    return this.usersService.create({ ...data, password: hashedPassword });
  }

  async refreshToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const newAccessToken = await this.jwtService.signAsync(
        { sub: payload.sub, email: payload.email },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: 60 * 60 * 24 * 3,
        },
      );

      const newRefreshToken = await this.jwtService.signAsync(
        { sub: payload.sub, email: payload.email },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: 60 * 60 * 24 * 14,
        },
      );
      return { access_token: newAccessToken, refresh_token: newRefreshToken };
    } catch {
      throw new UnauthorizedException();
    }
  }

  async forgotPassword(email: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Пользователь с таким email не найден');
      }

      const newPassword = await this.generateRandomPassword();

      const hashedPassword = await bcrypt.hash(
        newPassword,
        Number(process.env.BCRYPT_SALT!),
      );

      const test = await this.usersService.update(user.id, {
        password: hashedPassword,
      });

      await sendNewPassword(email, newPassword);

      return { message: 'Новый пароль отправлен на почту' };
    } catch (error) {
      console.error(error);
      throw error; // Пробрасываем ошибку для обработки в контроллере
    }
  }

  async generateRandomPassword(length: number = 6) {
    const chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }
}
