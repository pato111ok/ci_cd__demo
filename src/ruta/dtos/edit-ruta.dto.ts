import { PartialType, OmitType } from "@nestjs/mapped-types";
import { IsInt } from "class-validator";
import { CreateRutaDTO } from "./create-ruta.dto";

export class EditRutaDTO extends CreateRutaDTO
{

    @IsInt()
    rut_estado: number;

 }

/*export class EditRutadDTO extends PartialType(
    OmitType(EditRutadDTO, ['per_nombre'] as const)
) { }*/