import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePerfilDTO } from './dtos/create-perfil.dto';
import { EditPerfilDTO } from './dtos/edit-perfil.dto';
import { Perfiles } from './entities/perfiles.entity';

@Injectable()
export class PerfilService {
  constructor(
    @InjectRepository(Perfiles)
    private readonly PerfilRepository: Repository<Perfiles>,
  ) {}

  async getAll() {
    return await this.PerfilRepository.find();
  }

  async create(perfil: CreatePerfilDTO) {
    const rol = await this.PerfilRepository.findOne({
      per_nombre: perfil.per_nombre,
    });
    if (rol) {
      return { msg: false, error: 'El rol ya existe..!!' };
    } else {
      const perfilCreated = this.PerfilRepository.create(perfil as any);
      const rolc = await this.PerfilRepository.save(perfilCreated);
      return { msg: true, data: rolc };
    }
  }

  async getById(id: number) {
    const perfil = await this.PerfilRepository.findOne(id);
    if (!perfil) throw new NotFoundException();
    return perfil;
  }

  async edit(id: number, perfil: EditPerfilDTO) {
    const rol = await this.PerfilRepository.findOne({ per_id: id });

    if (!rol) {
      return { msg: false, error: 'Rol no registrado..!!' };
    } else {
      const editedRol = Object.assign(rol, perfil);
      const rolc = await this.PerfilRepository.save(editedRol);
      return { msg: true, data: rolc };
    }
  }
}
