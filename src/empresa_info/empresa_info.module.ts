import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa_info } from 'src/empresa_info/entities/empresa_info.entity';
import { Empresa_infoController } from './empresa_info.controller';
import { Empresa_infoService } from './empresa_info.service';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa_info])],
  controllers: [Empresa_infoController],
  providers: [Empresa_infoService],
})
export class Empresa_infoModule {}
