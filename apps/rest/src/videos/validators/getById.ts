import { IsNotEmpty } from 'class-validator';

export class VideosGetByIdDto {
  @IsNotEmpty()
  id: string;
}
