import { PartialType, OmitType } from "@nestjs/mapped-types";
import { IsInt } from "class-validator";
import { CreateViajesDTO } from "./create-viajes.dto";

export class EditViajesDTO extends CreateViajesDTO
{

    /*@IsInt()
    usu_estado: number;*/

 }

/*export class EditViajesDTO extends PartialType(
    OmitType(CreateUnidadDTO, ['per_nombre'] as const)
) { }*/