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

import { Empresa_infoService } from './empresa_info.service';
import { Response } from 'express';
import { Any } from 'typeorm';


@Controller('empresa_info')
export class Empresa_infoController {
  constructor(private readonly empresa_infoService: Empresa_infoService) {}

  @Get('/all')
  async getAll() {
    const rols = await this.empresa_infoService.getAll();
    let f_caduca:any = new Date(rols[0]['f_caduca']);
    f_caduca = new Date(f_caduca).toLocaleDateString('sv');

    var fechaInicio = new Date(rols[0]['f_caduca']).getTime();
    var fechaFin    = new Date().getTime();
    var diff = fechaInicio-fechaFin;
    var dias = Math.round(diff/(1000*60*60*24))+1 ;
 
    return { msg: true, f_caduca: f_caduca, dias: dias };
  }

  /*@Get('/getById/:id')
  async getById(@Param('id') id: number) {
    return await this.empresa_infoService.getById(id);
  }*/

}
