import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'] || request.headers['Authorization'];
    try {
      const { data } = await this.authService.verifyAccessToken(authorizationHeader.split('Bearer ')[1]);
      request.user = data;
      console.log(data);
      return true;
    } catch (err) {
      throw new UnauthorizedException('Bearer token is invalid or absent');
    }
  }
}
