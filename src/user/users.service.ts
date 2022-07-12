import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { v4 as uuid } from 'uuid';
import { MESSAGES } from '../common/enums/messages';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: string): Promise<User> {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException();
    } else {
      return user;
    }
  }

  async create(createDto: CreateUserDto): Promise<User> {
    const nowDate = Date.now();
    const newUser = new User();
    newUser.login = createDto.login;
    newUser.password = createDto.password;
    newUser.id = uuid();
    newUser.version = 1;
    newUser.createdAt = nowDate;
    newUser.updatedAt = nowDate;
    this.users.push(newUser);
    return newUser;
  }

  async update(id: string, updateDto: UpdatePasswordDto): Promise<User> {
    const user = await this.findOne(id);
    if (user.password !== updateDto.oldPassword) {
      throw new ForbiddenException(MESSAGES.OLD_PASSWORD_IS_WRONG);
    }
    user.version++;
    user.password = updateDto.newPassword;
    user.updatedAt = Date.now();
    return user;
  }

  async delete(id: string): Promise<void> {
    const user = await this.findOne(id);
    if (user) this.users = this.users.filter((item) => item.id !== id);
  }
}
