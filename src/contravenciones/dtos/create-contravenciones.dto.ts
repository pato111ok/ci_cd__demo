import { IsBoolean, IsDate, IsDateString, IsEnum, IsInt, IsNumber, IsString } from "class-validator";
import { EnumToString } from "src/helpers/enumsToString";


export class CreateContravencionesDTO {


    @IsDateString()
    con_fecha_desde: Date

    @IsDateString()
    con_fecha_hasta: Date

    @IsString()
    con_observaciones: string;

    @IsInt()
    usu_id: number;

}