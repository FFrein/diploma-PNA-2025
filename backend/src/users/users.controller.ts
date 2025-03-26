import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put()
  @UseGuards(AuthGuard)
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const data: UpdateUserDto = {};
    if (updateUserDto.FIO) data.FIO = updateUserDto.FIO;
    if (updateUserDto.phone) data.phone = updateUserDto.phone;
    if (updateUserDto.password) {
      data.password = await bcrypt.hash(
        updateUserDto.password,
        Number(process.env.BCRYPT_SALT!),
      );
    }

    const result = await this.usersService.update(req.user.id, {
      ...data,
    });

    const { password, ...userData } = result;

    return userData;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
