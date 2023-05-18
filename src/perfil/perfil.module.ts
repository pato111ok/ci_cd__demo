import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perfiles } from 'src/perfil/entities/perfiles.entity';
import { PerfilController } from './perfil.controller';
import { PerfilService } from './perfil.service';

@Module({
  imports: [TypeOrmModule.forFeature([Perfiles])],
  controllers: [PerfilController],
  providers: [PerfilService],
})
export class PerfilModule {}
