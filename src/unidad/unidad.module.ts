import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unidades } from './entities/unidades.entity';
import { UnidadController } from './unidad.controller';
import { UnidadService } from './unidad.service';

@Module({
  imports: [TypeOrmModule.forFeature([Unidades])],
  controllers: [UnidadController],
  providers: [UnidadService]
})
export class UnidadModule {}
