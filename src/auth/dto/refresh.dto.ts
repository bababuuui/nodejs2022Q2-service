import { Allow, IsNotEmpty, IsString } from 'class-validator';

export class RefreshDto {
  @Allow()
  refreshToken: string;
}
