import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { MESSAGES } from '../common/enums/messages';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    } else {
      return user;
    }
  }

  async create(createDto: CreateUserDto): Promise<User> {
    const nowDate = Math.floor(Date.now() / 1000);
    const newUser = new User();
    newUser.login = createDto.login;
    newUser.password = createDto.password;
    newUser.version = 1;
    newUser.createdAt = nowDate;
    newUser.updatedAt = nowDate;
    this.userRepository.create(newUser);
    return await this.userRepository.save(newUser);
  }

  async update(id: string, updateDto: UpdatePasswordDto): Promise<User> {
    const user = await this.findOne(id);
    if (user.password !== updateDto.oldPassword) {
      throw new ForbiddenException(MESSAGES.OLD_PASSWORD_IS_WRONG);
    }
    user.version++;
    user.password = updateDto.newPassword;
    user.updatedAt = Math.floor(Date.now() / 1000) + 1;
    return await this.userRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.findOne(id);
    if (user) await this.userRepository.delete(id);
  }
}
