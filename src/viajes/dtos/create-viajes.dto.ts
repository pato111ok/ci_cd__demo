import { IsBoolean, IsDate, IsDateString, IsEnum, IsInt, IsNumber, IsString } from "class-validator";
import { EnumToString } from "src/helpers/enumsToString";


export class CreateViajesDTO {

    @IsString()
    via_fecha: string;

    @IsString()
    via_hora: string;

    @IsString()
    conductor_id: string;

    @IsString()
    auxiliar_id: string;

    @IsInt()
    uni_id: number;
    
    @IsInt()
    rut_id: number;

}