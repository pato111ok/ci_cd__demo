/* eslint-disable prettier/prettier */
import { ReadUsuariosDto } from './dtos/read-usuarios.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateUsuariosDTO } from './dtos/create-usuarios.dto';
import { response, Response } from 'express';
import { UsuariosService } from './usuarios.service';
import { EditUsuariosDTO } from './dtos/edit-usuarios.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly UsuariosService: UsuariosService) {}

  @Get('all')
  async getAll() {
    const rols = await this.UsuariosService.getAll();
    return { msg: true, data: rols };
  }

  @Get()
  async getUsers() {
    const users: ReadUsuariosDto[] = await this.UsuariosService.getUsers();
    return { msg: true, data: users };
  }

  @Get('employes')
  async getEmployes() {
    const users: ReadUsuariosDto[] = await this.UsuariosService.getEmployes();
    return { msg: true, data: users };
  }

  @Get('admins')
  async getAdmins() {
    const users: ReadUsuariosDto[] = await this.UsuariosService.getAdmins();
    return { msg: true, data: users };
  }

  @Get('active')
  async getAct() {
    const rols = await this.UsuariosService.getAct();
    return { msg: true, data: rols };
  }

  @Get('inactive')
  async getInac() {
    const rols = await this.UsuariosService.getInac();
    return { msg: true, data: rols };
  }

  @Get('/getById/:id')
  async getById(@Param('id') id: number) {
    return await this.UsuariosService.getById(id);
  }
  
  @Post('/create')
  async create(@Body() Usuario: CreateUsuariosDTO, @Res() response: Response) {
    console.log(Usuario);
    const user = await this.UsuariosService.create(Usuario);
    response.status(HttpStatus.CREATED).json({
      data: user,
    });
  }

  @Post('changepass')
  async changePass(@Body() credencitials: any, @Res() response: Response) {
    const res = await this.UsuariosService.changePass(credencitials);
    response.status(HttpStatus.CREATED).json({
      mesagge: 'Cambio exitoso...!',
      data: res,
    });
  }

  @Post('recoverypass')
  async recoveryPass(@Body() data: any, @Res() response: Response) {
    if (data.usu_email == '') {
      throw new NotFoundException('Por favor debe proporcionar un correo ...!');
    }
    const user = await this.UsuariosService.recoveryPass(data.usu_email);
    if (user) {
      this.UsuariosService.sendEmail(data.usu_email, user).subscribe(
        async (result: any) => {
          const dta = await result;
          if (dta.status === 200) {
            response.status(HttpStatus.OK).json({
              data: dta.data,
            });
          } else {
            throw new NotFoundException(
              'Ha surgido un error al enviar el correo electronico ...!',
            );
          }
        },
      );
    }
  }

  @Get(':id')
  async show(@Param('id') userId: number, @Res() response: Response) {
    const user: ReadUsuariosDto = await this.UsuariosService.showById(userId);
    response.status(HttpStatus.OK).json({
      data: user,
    });
  }

  @Put('/edit/:id')
  async edit(
    @Param('id') id: number,
    @Body() rol: EditUsuariosDTO,
    @Res() response: Response,
  ) {
    const user: ReadUsuariosDto = await this.UsuariosService.edit(id, rol);
    response.status(HttpStatus.OK).json({
      data: user,
    });
  }

  @Patch(':id')
  async edite(
    @Param('id') userId: number,
    @Body() data: any,
    @Res() response: Response,
  ) {
    const sentence: ReadUsuariosDto = await this.UsuariosService.updateUser(
      userId,
      data,
    );
    response.status(HttpStatus.OK).json({
      data: sentence,
    });
  }

  @Delete(':id')
  async delete(@Param('id') userId: number, @Res() response: Response) {
    const user = await this.UsuariosService.deleteById(userId);
    response.status(HttpStatus.OK).json({
      message: 'Eliminado lógico exitoso ..!',
      data: user,
    });
  }
}
