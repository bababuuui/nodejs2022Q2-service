import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createDto: CreateUserDto) {
    return this.userService.create(createDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto
  ) {
    return this.userService.update(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    await this.userService.delete(id);
  }
}
