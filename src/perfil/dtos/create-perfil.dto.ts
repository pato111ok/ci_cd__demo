import { IsBoolean, IsEnum, IsInt, IsNumber, IsString } from "class-validator";
import { EnumToString } from "src/helpers/enumsToString";


export class CreatePerfilDTO {

    @IsString()
    per_nombre: string;

    @IsString()
    per_descripcion: string;



}