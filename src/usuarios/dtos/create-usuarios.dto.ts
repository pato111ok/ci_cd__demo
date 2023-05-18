import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  minLength,
  MinLength,
} from 'class-validator';
import { EnumToString } from 'src/helpers/enumsToString';

export class CreateUsuariosDTO {
  @IsString()
  @MinLength(10)
  usu_cedula: string;

  @IsString()
  @MinLength(3)
  usu_nombre: string;

  @IsString()
  @MinLength(3)
  usu_apellido: string;

  @IsString()
  usu_foto: string;
  // eslint-disable-next-line prettier/prettier

  @IsNotEmpty()
  usu_huella: any;

  @IsInt()
  usu_tipo: number;

  @IsString()
  usu_clave: string;

  @IsInt()
  per_id: number;

  @IsString()
  usu_email: string;
}
