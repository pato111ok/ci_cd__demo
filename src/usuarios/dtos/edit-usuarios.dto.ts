import { IsString } from 'class-validator';
// import { PartialType, OmitType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateUsuariosDTO } from './create-usuarios.dto';
export class EditUsuariosDTO {
  @IsString()
  usu_email: string;

  @IsString()
  usu_cedula: string;

  @IsInt()
  usu_estado: number;

  @IsString()
  usu_nombre: string;

  @IsString()
  usu_apellido: string;

  @IsInt()
  usu_tipo: number;

  @IsInt()
  per_id: number;
}
