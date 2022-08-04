import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { MESSAGES } from '../common/enums/messages';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { RefreshDto } from './dto/refresh.dto';
import { User } from '../users/entities/user';
import { CustomLogger } from '../common/utils/logging/custom-logger.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService, private logger: CustomLogger) {
    this.logger = new CustomLogger(AuthService.name);
  }

  private async validateUser(login: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOneByLogin(login);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  private singTokens(payload: any) {
    return {
      accessToken: this.jwtService.sign({ payload }, { secret: process.env.JWT_SECRET_KEY, expiresIn: '600s' }),
      refreshToken: this.jwtService.sign({ payload }, { secret: process.env.JWT_SECRET_REFRESH_KEY, expiresIn: '10h' }),
    };
  }

  async login(loginDto: LoginDto) {
    const { login, password } = loginDto;
    const user = await this.validateUser(login, password);
    if (!user) {
      throw new ForbiddenException(MESSAGES.INCORRECT_AUTH);
    } else {
      const payload = { login: user.login, userId: user.id };
      return this.singTokens(payload);
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<any> {
    await this.usersService.create(signUpDto);
  }

  async verifyAccessToken(token) {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
  }
  async verifyRefreshToken(token) {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });
  }

  async getNewTokensByRefreshToken(refreshDto: RefreshDto) {
    if (!refreshDto.refreshToken) {
      throw new UnauthorizedException(MESSAGES.REFRESH_IS_ABSENT);
    }
    try {
      const data = await this.verifyRefreshToken(refreshDto.refreshToken);
      return this.singTokens(data.payload);
    } catch (err) {
      throw new ForbiddenException(MESSAGES.REFRESH_IS_INVALID);
    }
  }
}
