import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { RutaService } from './ruta.service';
import { Response } from 'express';
import { CreateRutaDTO } from './dtos/create-ruta.dto';
import { EditRutaDTO } from './dtos/edit-ruta.dto';

@Controller('ruta')
export class RutaController {

    constructor(private readonly RutaService: RutaService) {

    }

    @Get('all')
    async getAll() {
        const rols = await this.RutaService.getAll();
        return { msg: true, data: rols };
    }
    @Get('active')
    async getAct() {
        const rols = await this.RutaService.getAct();
        return { msg: true, data: rols };
    }
    @Get('inactive')
    async getInac() {
        const rols = await this.RutaService.getInac();
        return { msg: true, data: rols };
    }

    @Get('activas')
    async getEstAct() {
        const rols = await this.RutaService.getEstAct();
        return { msg: true, data: rols };
    }

    @Get('/getById/:id')
    async getById(@Param('id') id: number) {
        return await this.RutaService.getById(id);
    }

    // @Post('/create')
    // async create(@Body() rol: RolDTO, @Res() response: Response) {
    //     // const userCreated = await this.serviceuser.createUser(user);
    //     // console.log(userCreated, 'usercreated');

    // }
    @Post('/create')
    async create(
        @Body() Unidad: CreateRutaDTO,
        @Res() response: Response
    ) {
        const crear =  await this.RutaService.create(Unidad);
        response.status(HttpStatus.CREATED).json({
            data: crear,
        });
    }

    

    @Put('/edit/:id')
    async edit(
        @Param('id') id: number,
        @Body() rol: EditRutaDTO,
        @Res() response: Response
    ) {
        const crear = await this.RutaService.edit(id, rol)//rol
        response.status(HttpStatus.CREATED).json({
            data: crear,
        });
    }

    @Delete('/delete/:id')
    async delete(
        @Param('id') id: number,
        @Res() response: Response
    ) {
        const crear = await this.RutaService.deleteById(id)
        response.status(HttpStatus.OK).json({
            data: crear,
        });
    }

}
