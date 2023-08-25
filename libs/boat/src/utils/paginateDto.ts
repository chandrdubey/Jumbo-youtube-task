import { Transform } from 'class-transformer';
import { IsOptional, ValidateIf } from 'class-validator';

export class PaginatedFilterDTO {
  @IsOptional()
  @Transform((o) => (o.value == 'true' ? true : false))
  paginate: boolean;

  @IsOptional()
  @Transform((o) => (o.value ? +o.value : 1))
  @ValidateIf((o) => o.paginate == 'true')
  page: number;

  @IsOptional()
  @Transform((o) => (o.value ? +o.value : 15))
  @ValidateIf((o) => o.paginate == 'true')
  perPage: number;

  @IsOptional()
  sort: string;
}
