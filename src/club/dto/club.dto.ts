import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsUrl,
  Length,
} from 'class-validator';

export class ClubDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  @IsDateString()
  fechaFundacion: Date;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  @Length(0, 100)
  descripcion: string;
}
