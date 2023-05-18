import { PartialType, OmitType } from "@nestjs/mapped-types";
import { IsInt } from "class-validator";
import { CreatePerfilDTO } from "./create-perfil.dto";

export class EditPerfilDTO extends CreatePerfilDTO
{ 

    @IsInt()
    per_estado: number;
}

/*export class EditPerfilDTO extends PartialType(
    OmitType(CreatePerfilDTO, ['per_nombre'] as const)
) { }*/