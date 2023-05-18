import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUnidadDTO } from './dtos/create-unidad.dto';
import { EditUnidadDTO } from './dtos/edit-unidad.dto';
import { Unidades } from './entities/unidades.entity';
import * as _ from "lodash";

@Injectable()
export class UnidadService {

    constructor(
        @InjectRepository(Unidades)
        private readonly UnidadRepository: Repository<Unidades>
    ) {

    }

    async getAll() {
        const respuesta =  await this.UnidadRepository.find();
        return await _.orderBy(respuesta, ['uni_num_disco'], ['asc']);
    }
    async getAct() {
        const respuesta =  await this.UnidadRepository.find({uni_estado:1});
        return  await _.orderBy(respuesta, ['uni_num_disco'], ['asc']);
    }
    async getInac() {
        const respuesta =  await this.UnidadRepository.find({uni_estado:-1});
        return await _.orderBy(respuesta, ['uni_num_disco'], ['asc']);
    }

    async create(unidad: CreateUnidadDTO) {
        const num_disco = await this.UnidadRepository.findOne({uni_num_disco:unidad.uni_num_disco});
        const placa = await this.UnidadRepository.findOne({uni_placa:unidad.uni_placa});
        if (num_disco || placa){
            return {msg: false, error:"La unidad ya existe..!!" };
        }else{
            const UnidadCreated = this.UnidadRepository.create(unidad as any);
            const rolc = await this.UnidadRepository.save(UnidadCreated);
            return {msg: true, data:rolc };
        }
    }

    async getById(id: number) {
        const perfil = await this.UnidadRepository.findOne(id);
        if (!perfil) throw new NotFoundException();
        return perfil;
    }


    async edit(id: number, unidad: EditUnidadDTO) {
        const rol = await this.UnidadRepository.findOne({ uni_id: id });
        if (!rol) {
            return { msg: false, error: "Unidad no registrada..!!" };
        } else {
            const num_disco = unidad.uni_num_disco;
            const placa = unidad.uni_placa;
            const var1 = await this.UnidadRepository.createQueryBuilder('unidad')
                .where('uni_id != :id', { id })
                .andWhere('uni_num_disco = :num_disco', { num_disco }).getMany();
            const var2 = await this.UnidadRepository.createQueryBuilder('unidad')
                .where('uni_id != :id', { id })
                .andWhere('uni_placa = :placa', { placa }).getMany();
            if (var1.length > 0) {
                return { msg: false, error: "Número unidad ya registrada..!!" };
            } else {
                if (var2.length > 0) {
                    return { msg: false, error: " Placa ya registrada..!!" };
                } else {
                    const editedRol = Object.assign(rol, unidad);
                    const rolc = await this.UnidadRepository.save(editedRol);
                    return { msg: true, data: rolc };
                }
            }
        }
    }

    async deleteById(id: number) {
        const unidad = await this.UnidadRepository.findOne(id);
        if (!unidad) {
            return { msg: false, error: "Unidad no registrada..!!" };
        } else {
            const del = await this.UnidadRepository.delete(id);
            return { msg: true, data: del };
        }
    }


}
