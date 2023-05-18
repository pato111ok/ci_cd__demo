import { IsBoolean, IsEnum, IsInt, IsNumber, IsString } from "class-validator";
import { EnumToString } from "src/helpers/enumsToString";


export class CreateRutaDTO {

    @IsString()
    rut_origen: string;

    @IsString()
    rut_destino: string;

   /* @IsInt()
    uni_estado: number;*/

}