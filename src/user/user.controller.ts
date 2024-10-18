import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserEntity } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/auth/user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @Roles('admin')
  findAll(@User() user: any): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: number, @User() user: any): Promise<UserEntity> {
    if (user.role === 'admin' || user.userId == id)
      return this.userService.findOne(id);
    throw new ForbiddenException('You do not have access to this resource');
  }

  @Post()
  createUser(
    @Body()
    createUserDto: {
      name: string;
      email: string;
      password: string;
      studentRegister: string;
      role: 'admin' | 'student' | 'staff';
    },
  ): Promise<UserEntity> {
    const { name, email, password, studentRegister, role } = createUserDto;

    return this.userService.createUser(
      name,
      email,
      password,
      studentRegister,
      role,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @Roles('admin')
  updateUser(
    @Param('id') id: number,
    @User() user: any,
    @Body() updateData: Partial<UserEntity>,
  ): Promise<UserEntity> {
    if (user.role === 'admin' || user.userId === id)
      return this.userService.updateUser(id, updateData);
    throw new ForbiddenException('Você não possui acesso a esse recurso');
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Roles('admin')
  deleteUser(@Param('id') id: number, @User() user: any): Promise<void> {
    if (user.role === 'admin' || user.userId === id)
      return this.userService.deleteUser(id);
    throw new ForbiddenException('Você não possui acesso a esse recurso');
  }
}
