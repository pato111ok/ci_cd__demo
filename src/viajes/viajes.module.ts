import { HttpModule } from '@nestjs/common/http';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Viajes } from './entities/viajes.entity';
import { Usuarios } from '../usuarios/entities/usuarios.entity';
import { ViajesController } from './viajes.controller';
import { ViajesService } from './viajes.service';
import { UsuariosService } from '../usuarios/usuarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Viajes, Usuarios]), HttpModule],
  controllers: [ViajesController],
  providers: [ViajesService, UsuariosService],
})
export class ViajesModule {}
