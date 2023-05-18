import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rutas } from './entities/rutas.entity';
import { RutaController } from './ruta.controller';
import { RutaService } from './ruta.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rutas])],
  controllers: [RutaController],
  providers: [RutaService],
})
export class RutaModule {}
