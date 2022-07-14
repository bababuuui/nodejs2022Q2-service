import { IsInt, IsNotEmpty, IsString, IsUUID, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsInt()
  @IsNotEmpty()
  year: number;
  @ValidateIf((val) => val.artistId !== null)
  @IsUUID('4')
  artistId: string | null; // refers to Artist
}
