import { IsString, IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  usu_cedula: string;

  @IsNotEmpty()
  usu_clave: string;
}
