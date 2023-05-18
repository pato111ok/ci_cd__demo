import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreatePerfilDTO } from './dtos/create-perfil.dto';
import { PerfilService } from './perfil.service';
import { Response } from 'express';
import { EditPerfilDTO } from './dtos/edit-perfil.dto';

@Controller('perfil')
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) {}

  @Get('all')
  async getAll() {
    const rols = await this.perfilService.getAll();
    return { msg: true, data: rols };
  }

  @Get('/getById/:id')
  async getById(@Param('id') id: number) {
    return await this.perfilService.getById(id);
  }

  // @Post('/create')
  // async create(@Body() rol: RolDTO, @Res() response: Response) {
  //     // const userCreated = await this.serviceuser.createUser(user);
  //     // console.log(userCreated, 'usercreated');

  // }
  @Post('/create')
  async create(@Body() Perfil: CreatePerfilDTO, @Res() response: Response) {
    const crear = await this.perfilService.create(Perfil);
    response.status(HttpStatus.CREATED).json({
      data: crear,
    });
  }

  @Put('/edit/:id')
  async edit(
    @Param('id') id: number,
    @Body() rol: EditPerfilDTO,
    @Res() response: Response,
  ) {
    const crear = await this.perfilService.edit(id, rol); //rol
    response.status(HttpStatus.CREATED).json({
      data: crear,
    });
  }
}
