/* eslint-disable prettier/prettier */
import { Exclude, Expose } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';
import { IsString } from 'class-validator';

@Exclude()
export class ReadUsuariosDto {
  @Expose()
  @IsString()
  readonly usu_id: string;
  
  @Expose()
  @IsString()
  readonly usu_cedula: string;

  @Expose()
  @IsString()
  readonly usu_nombre: string;

  @Expose()
  @IsString()
  readonly usu_apellido: string;

  @Expose()
  @IsString()
  readonly usu_foto: string;

  @Expose()
  @IsInt()
  readonly usu_tipo: number;

  @Expose()
  // @IsInt()
  readonly per_id: any;

  @Expose()
  @IsString()
  readonly per_name: string;

  @Expose()
  @IsString()
  readonly usu_email: string;

  @Expose()
  @IsString()
  readonly usu_estado: number;
}
