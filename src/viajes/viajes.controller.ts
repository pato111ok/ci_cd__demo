/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateViajesDTO } from './dtos/create-viajes.dto';
import { ViajesService } from './viajes.service';
import { UsuariosService } from '../usuarios/usuarios.service';

import { EditViajesDTO } from './dtos/edit-viajes.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('viajes')
export class ViajesController {
  constructor(
    private readonly ViajesService: ViajesService,
    private readonly UsuariosService: UsuariosService,
  ) {}
  
  @Get()
  async getAll() {
    const rols = await this.ViajesService.getAll();
    return { msg: true, data: rols };
  }
  
  @Post('/all')
  async getFilter(@Body() f: any, @Res() response: Response) {
    const rols = await this.ViajesService.getFilter(f);
    response.status(HttpStatus.OK).json({
      data: rols,
    });
  }

  @Get('/getById/:id')
  async getById(@Param('id') id: number) {
    return await this.ViajesService.getById(id);
  }

  // @Post('/create')
  // async create(@Body() rol: RolDTO, @Res() response: Response) {
  //     // const userCreated = await this.serviceuser.createUser(user);
  //     // console.log(userCreated, 'usercreated');

  // }
  @Post('/create')
  async create(@Body() Usuario: CreateViajesDTO, @Res() response: Response) {
    const crear = await this.ViajesService.create(Usuario);
    response.status(HttpStatus.CREATED).json({
      data: crear,
    });
  }

  /*@Put('/edit/:id')
    async edit(
        @Param('id') id: number,
        @Body() rol: EditViajesDTO,
        @Res() response: Response
    ) {
        const crear = await this.ViajesService.edit(id, rol)//rol
        response.status(HttpStatus.CREATED).json({
            data: crear,
        });
    }*/

  @Delete('/delete/:id')
  async delete(@Param('id') id: number, @Res() response: Response) {
    console.log(id);
    const crear = await this.ViajesService.deleteById(id);
    response.status(HttpStatus.OK).json({
      data: crear,
    });
  }

  @Get('/search_usuario')
  async searchProducts(
    @Res() res: Response,
    @Query('q') searchProducts: string,
  ) {
    const resultProducts = await this.UsuariosService.searchUsuario(
      searchProducts,
    );
    res.status(HttpStatus.OK).json({
      data: resultProducts,
    });
  }
}
