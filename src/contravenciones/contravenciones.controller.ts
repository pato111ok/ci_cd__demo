import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateContravencionesDTO } from './dtos/create-contravenciones.dto';
import { Response } from 'express';
import { ContravencionesService } from './contravenciones.service';
import { EditContravencionesDTO } from './dtos/edit-contravenciones.dto';

@Controller('contravenciones')
export class ContravencionesController {


    constructor(private readonly ContravencionesService: ContravencionesService) {

    }


    @Post('/all')
    async getFilter(
        @Body() f: any,
        @Res() response: Response
    ) {
        const rols =  await this.ContravencionesService.getFilter(f);
        response.status(HttpStatus.OK).json({
            data: rols,
        });
    }

    /*@Get('all')
    async getAll() {
        const rols = await this.ContravencionesService.getAll();
        return { msg: true, data: rols };
    }*/

    @Get('/getById/:id')
    async getById(@Param('id') id: number) {
        return await this.ContravencionesService.getById(id);
    }

    // @Post('/create')
    // async create(@Body() rol: RolDTO, @Res() response: Response) {
    //     // const userCreated = await this.serviceuser.createUser(user);
    //     // console.log(userCreated, 'usercreated');

    // }
    @Post('/create')
    async create(
        @Body() Usuario: CreateContravencionesDTO,
        @Res() response: Response
    ) {
        const crear =  await this.ContravencionesService.create(Usuario);
        response.status(HttpStatus.CREATED).json({
            data: crear,
        });
    }

    @Put('/edit/:id')
    async edit(
        @Param('id') id: number,
        @Body() rol: EditContravencionesDTO,
        @Res() response: Response
    ) {
        const crear = await this.ContravencionesService.edit(id, rol)//rol
        response.status(HttpStatus.CREATED).json({
            data: crear,
        });
    }

    @Delete('/delete/:id')
    async delete(
        @Param('id') id: number,
        @Res() response: Response
    ) { console.log(id)
        const crear = await this.ContravencionesService.deleteById(id)
        response.status(HttpStatus.OK).json({
            data: crear,
        });
    }


}
