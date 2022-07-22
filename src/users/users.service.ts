import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { v4 as uuid } from 'uuid';
import { MESSAGES } from '../common/enums/messages';
import { InMemoryStore } from '../db/in-memory-store';

@Injectable()
export class UsersService {
  async findAll(): Promise<User[]> {
    return InMemoryStore.users;
  }

  async findOne(id: string): Promise<User> {
    const user = InMemoryStore.users.find((item) => item.id === id);
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
    InMemoryStore.users.push(newUser);
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
    //update in db
    const index = InMemoryStore.users.indexOf(user);
    InMemoryStore.users[index] = user;
    return user;
  }

  async delete(id: string): Promise<void> {
    const user = await this.findOne(id);
    if (user) InMemoryStore.users = InMemoryStore.users.filter((item) => item.id !== id);
  }
}
