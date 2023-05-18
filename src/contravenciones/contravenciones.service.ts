import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from "lodash";
import { getManager, Repository } from 'typeorm';
import { CreateContravencionesDTO } from './dtos/create-contravenciones.dto';
import { EditContravencionesDTO } from './dtos/edit-contravenciones.dto';
import { Contravenciones } from './entities/contravenciones.entity';

@Injectable()
export class ContravencionesService {


    
    constructor(
        @InjectRepository(Contravenciones)
        private readonly ContravencionesRepository: Repository<Contravenciones>
    ) {

    }

    async getFilter(objNew) {
        if (objNew.num_cedula != "") {
            if (objNew.fecha_desde != "" || objNew.fecha_hasta != "") {
                return await getManager().createQueryBuilder("contravenciones", 'c')
                    .addSelect('u.usu_cedula', 'cedula')
                    .addSelect('u.usu_nombre', 'nombre')
                    .addSelect('u.usu_apellido', 'apellido')
                    .innerJoin('usuarios', 'u', 'u.usu_id = c.usu_id')
                    .where('u.usu_cedula = :cedula ', { cedula: objNew.num_cedula })
                    .andWhere('c.con_fecha_desde BETWEEN :fecha_desde AND :fecha_hasta  ', { fecha_desde: objNew.fecha_desde, fecha_hasta: objNew.fecha_hasta })
                    .andWhere('c.con_fecha_hasta BETWEEN :fecha_desde AND :fecha_hasta  ', { fecha_desde: objNew.fecha_desde, fecha_hasta: objNew.fecha_hasta })
                    .getRawMany();
            } else {
                return await getManager().createQueryBuilder("contravenciones", 'c')
                    .addSelect('u.usu_cedula', 'cedula')
                    .addSelect('u.usu_nombre', 'nombre')
                    .addSelect('u.usu_apellido', 'apellido')
                    .innerJoin('usuarios', 'u', 'u.usu_id = c.usu_id')
                    .where('u.usu_cedula = :cedula ', { cedula: objNew.num_cedula })
                    .getRawMany();
            }
        } else {
            if (objNew.fecha_desde != "" || objNew.fecha_hasta != "") {
                return await getManager().createQueryBuilder("contravenciones", 'c')
                    .addSelect('u.usu_cedula', 'cedula')
                    .addSelect('u.usu_nombre', 'nombre')
                    .addSelect('u.usu_apellido', 'apellido')
                    .innerJoin('usuarios', 'u', 'u.usu_id = c.usu_id')
                    .andWhere('c.con_fecha_desde BETWEEN :fecha_desde AND :fecha_hasta  ', { fecha_desde: objNew.fecha_desde, fecha_hasta: objNew.fecha_hasta })
                    .andWhere('c.con_fecha_hasta BETWEEN :fecha_desde AND :fecha_hasta  ', { fecha_desde: objNew.fecha_desde, fecha_hasta: objNew.fecha_hasta })
                    .getRawMany();
            }
        }
    }

    async create(suspencion: CreateContravencionesDTO) {
        const ContravencionesCreated = this.ContravencionesRepository.create(suspencion as any);
        const rolc = await this.ContravencionesRepository.save(ContravencionesCreated);
        return { msg: true, data: rolc };

    }

    async getById(id: number) {
        const perfil = await this.ContravencionesRepository.findOne(id);
        if (!perfil) throw new NotFoundException();
        return perfil;
    }


    async edit(id: number, usuario: EditContravencionesDTO) {console.log(id);console.log(usuario);
        const rol = await this.ContravencionesRepository.findOne({ con_id: id });console.log(rol)
        if (!rol) {
            return { msg: false, error: "Sancion no registrada..!!" };
        } else {
            const editedRol = Object.assign(rol, usuario);
            const rolc = await this.ContravencionesRepository.save(editedRol);
            return { msg: true, data: rolc };
        }
    }

    async deleteById(id: number) {
        const usuario = await this.ContravencionesRepository.findOne(id);
        if (!usuario) {
            return { msg: false, error: "Sancion no registrada..!!" };
        } else {
            const del = await this.ContravencionesRepository.delete(id);
            return { msg: true, data: del };
        }
    }

}
