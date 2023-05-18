/* eslint-disable no-var */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { AuthLoginDto } from './dtos/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);

    if (user.usu_id) {
      const perfil_usu = await this.usersService.getPerfilUser(user.usu_id);
      var payload = {
        userId: user.usu_id,
        nombre_usuario: user.usu_nombre + ' ' + user.usu_apellido,
        cedula: user.usu_cedula,
        perfilId: user.per_id,
        perfil: perfil_usu[0]['u_rol'],
      };
    }

    return {
      state: true,
      access_token: this.jwtService.sign(payload),
      user: payload,
      message: 'Ingreso correcto..!!',
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<Usuarios> {
    const { usu_cedula, usu_clave } = authLoginDto;

    const user = await this.usersService.findByEmail(usu_cedula);
    if (!(await user?.validatePassword(usu_clave))) {
      throw new UnauthorizedException({
        state: false,
        message: 'Acceso incorrecto...!!',
      });
    }

    return user;
  }
}
