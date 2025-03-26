import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({
    example: 'email',
    description: 'почта пользователя',
  })
  @IsString()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    example: 'password',
    description: 'Пароль пользователя',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
