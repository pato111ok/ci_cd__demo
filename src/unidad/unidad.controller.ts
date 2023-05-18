import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { EditUnidadDTO } from './dtos/edit-unidad.dto';
import { Response } from 'express';
import { UnidadService } from './unidad.service';
import { CreateUnidadDTO } from './dtos/create-unidad.dto';


@Controller('unidad')
export class UnidadController {

    constructor(private readonly UnidadService: UnidadService) {

    }

    @Get('all')
    async getAll() {
        const rols = await this.UnidadService.getAll();
        return { msg: true, data: rols };
    }
    @Get('active')
    async getAct() {
        const rols = await this.UnidadService.getAct();
        return { msg: true, data: rols };
    }
    @Get('inactive')
    async getInac() {
        const rols = await this.UnidadService.getInac();
        return { msg: true, data: rols };
    }

    @Get('/getById/:id')
    async getById(@Param('id') id: number) {
        return await this.UnidadService.getById(id);
    }

    // @Post('/create')
    // async create(@Body() rol: RolDTO, @Res() response: Response) {
    //     // const userCreated = await this.serviceuser.createUser(user);
    //     // console.log(userCreated, 'usercreated');

    // }
    @Post('/create')
    async create(
        @Body() Unidad: CreateUnidadDTO,
        @Res() response: Response
    ) {
        const crear =  await this.UnidadService.create(Unidad);
        response.status(HttpStatus.CREATED).json({
            data: crear,
        });
    }

    

    @Put('/edit/:id')
    async edit(
        @Param('id') id: number,
        @Body() rol: EditUnidadDTO,
        @Res() response: Response
    ) {
        const crear = await this.UnidadService.edit(id, rol)//rol
        response.status(HttpStatus.CREATED).json({
            data: crear,
        });
    }

    @Delete('/delete/:id')
    async delete(
        @Param('id') id: number,
        @Res() response: Response
    ) {
        const crear = await this.UnidadService.deleteById(id)
        response.status(HttpStatus.OK).json({
            data: crear,
        });
    }

}
