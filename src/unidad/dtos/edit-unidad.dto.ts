import { PartialType, OmitType } from "@nestjs/mapped-types";
import { IsInt } from "class-validator";
import { CreateUnidadDTO } from "./create-unidad.dto";

export class EditUnidadDTO extends CreateUnidadDTO
{

    @IsInt()
    uni_estado: number;

 }

/*export class EditUnidadDTO extends PartialType(
    OmitType(CreateUnidadDTO, ['per_nombre'] as const)
) { }*/