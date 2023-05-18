import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { CreateViajesDTO } from './dtos/create-viajes.dto';
import { EditViajesDTO } from './dtos/edit-viajes.dto';
import { Viajes } from './entities/viajes.entity';

@Injectable()
export class ViajesService {
  constructor(
    @InjectRepository(Viajes)
    private readonly ContravencionesRepository: Repository<Viajes>,
  ) {}

  async getAll() {
    return await await this.ContravencionesRepository.find();
  }

  async getFilter(objNew) {
    if (objNew.fecha_desde != '' || objNew.fecha_hasta != '') {
      const viajesFilter: any = getManager()
        .createQueryBuilder('viajes', 'v')
        .select('v.via_fecha', 'via_fecha')
        .addSelect('v.via_hora', 'via_hora')
        .addSelect('u.uni_num_disco', 'uni_num_disco')
        .addSelect('CONCAT( r.rut_origen, " ", r.rut_destino )', 'ruta')
        .addSelect('CONCAT( uc.usu_nombre, " ", uc.usu_apellido )', 'chofer')
        .addSelect('CONCAT( ua.usu_nombre, " ", ua.usu_apellido )', 'auxiliar')
        .addSelect('co.con_fecha_desde', 'co_fecha_desde')
        .addSelect('co.con_fecha_hasta', 'co_fecha_hasta')
        .addSelect('uc.usu_estado', 'estado_chofer')
        .addSelect('ua.usu_estado', 'estado_chofer')
        .innerJoin('unidades', 'u', 'v.uni_id = u.uni_id')
        .innerJoin('rutas', 'r', 'v.rut_id = r.rut_id')
        .leftJoin('contravenciones', 'co', 'co.usu_id = v.conductor_id')
        .leftJoin('usuarios', 'uc', 'v.conductor_id = uc.usu_id')
        .leftJoin('usuarios', 'ua', 'v.auxiliar_id = ua.usu_id')
        .where('v.via_fecha BETWEEN :fecha_desde AND :fecha_hasta  ', {
          fecha_desde: objNew.fecha_desde,
          fecha_hasta: objNew.fecha_hasta,
        })
        .orderBy('v.via_fecha ', 'ASC')
        .addOrderBy('v.via_hora ', 'ASC');

      if (objNew.cedula > 0) {
        const usu_id = await getManager()
          .createQueryBuilder('usuarios', 'u')
          .select('u.usu_id', 'usu_id')
          .where('u.usu_cedula = :cedula', { cedula: objNew.cedula })
          .getRawOne();

        viajesFilter.andWhere(
          '(v.conductor_id = :usu_id OR v.auxiliar_id = :aux_usu_id )',
          { usu_id: usu_id.usu_id, aux_usu_id: usu_id.usu_id },
        );
        //.orWhere("v.auxiliar_id = :usu_id", { usu_id: usu_id.usu_id })
      }

      if (objNew.unidad > 0) {
        const uni_id = await getManager()
          .createQueryBuilder('unidades', 'u')
          .select('u.uni_id', 'uni_id')
          .where('u.uni_num_disco = :unidad', { unidad: objNew.unidad })
          .getRawOne();

        viajesFilter.andWhere('v.uni_id = :uni_id', { uni_id: uni_id.uni_id });
      }

      if (objNew.ruta > 0) {
        viajesFilter.andWhere('v.rut_id = :rut_id', { rut_id: objNew.ruta });
      }

      const dailyStatsRaws = await viajesFilter.getRawMany();
      return dailyStatsRaws;

      //return await viajesFilter;
    }
  }

  async create(suspencion: CreateViajesDTO) {
    const ContravencionesCreated = this.ContravencionesRepository.create(
      suspencion as any,
    );
    const rolc = await this.ContravencionesRepository.save(
      ContravencionesCreated,
    );
    return { msg: true, data: rolc };
  }

  async getById(id: number) {
    const perfil = await this.ContravencionesRepository.findOne(id);
    if (!perfil) throw new NotFoundException();
    return perfil;
  }

  /*async edit(id: number, usuario: EditViajesDTO) {console.log(id);console.log(usuario);
        const rol = await this.ContravencionesRepository.findOne({ con_id: id });console.log(rol)
        if (!rol) {
            return { msg: false, error: "Sancion no registrada..!!" };
        } else {
            const editedRol = Object.assign(rol, usuario);
            const rolc = await this.ContravencionesRepository.save(editedRol);
            return { msg: true, data: rolc };
        }
    }*/

  async deleteById(id: number) {
    const usuario = await this.ContravencionesRepository.findOne(id);
    if (!usuario) {
      return { msg: false, error: 'Sancion no registrada..!!' };
    } else {
      const del = await this.ContravencionesRepository.delete(id);
      return { msg: true, data: del };
    }
  }
}
