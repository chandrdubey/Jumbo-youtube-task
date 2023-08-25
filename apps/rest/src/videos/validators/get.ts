import { PaginatedFilterDTO } from '@libs/boat/utils/paginateDto';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class SearchVideosDto extends PaginatedFilterDTO {
  @IsOptional()
  q: string;

  @IsOptional()
  @Transform(({ value }) => (value == 'true' ? true : false))
  watchLater: string;
}
