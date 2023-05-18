import { PartialType, OmitType } from "@nestjs/mapped-types";
import { IsInt } from "class-validator";
import { CreateContravencionesDTO } from "./create-contravenciones.dto";

export class EditContravencionesDTO extends CreateContravencionesDTO
{

    /*@IsInt()
    usu_estado: number;*/

 }

/*export class EditContravencionesDTO extends PartialType(
    OmitType(CreateUnidadDTO, ['per_nombre'] as const)
) { }*/