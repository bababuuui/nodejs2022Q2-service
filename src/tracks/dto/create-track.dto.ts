import { IsNotEmpty, IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @ValidateIf((val) => val.artistId !== null)
  @IsUUID('4')
  artistId: string | null; // refers to Artist
  @ValidateIf((val) => val.albumId !== null)
  @IsUUID('4')
  albumId: string | null; // refers to Album
  @IsNumber()
  @IsNotEmpty()
  duration: number; // integer number
}
