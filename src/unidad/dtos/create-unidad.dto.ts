import { IsBoolean, IsEnum, IsInt, IsNumber, IsString } from "class-validator";
import { EnumToString } from "src/helpers/enumsToString";


export class CreateUnidadDTO {

    @IsInt()
    uni_num_disco: number;

    @IsString()
    uni_placa: string;

   /* @IsInt()
    uni_estado: number;*/

}