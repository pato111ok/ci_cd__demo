import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContravencionesController } from './contravenciones.controller';
import { ContravencionesService } from './contravenciones.service';
import { Contravenciones } from './entities/contravenciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contravenciones])],
  controllers: [ContravencionesController],
  providers: [ContravencionesService]
})
export class ContravencionesModule {}
