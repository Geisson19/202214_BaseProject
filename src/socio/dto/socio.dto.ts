import { IsString, IsNotEmpty, IsDateString, IsEmail } from 'class-validator';

export class SocioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  correo: string;

  @IsDateString()
  @IsNotEmpty()
  fechaNacimiento: Date;
}
