import { PartialType, OmitType } from "@nestjs/mapped-types";
import { IsInt } from "class-validator";
import { AuthLoginDto } from "./auth-login.dto";

export class EditUsuariosDTO extends AuthLoginDto
{

    /*@IsInt()
    usu_estado: number;*/

 }

/*export class EditUsuariosDTO extends PartialType(
    OmitType(CreateUnidadDTO, ['per_nombre'] as const)
) { }*/