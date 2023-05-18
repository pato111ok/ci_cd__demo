import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa_info } from './entities/empresa_info.entity';

@Injectable()
export class Empresa_infoService {
  constructor(
    @InjectRepository(Empresa_info)
    private readonly Empresa_infoRepository: Repository<Empresa_info>,
  ) {}

  async getAll() {
    return await this.Empresa_infoRepository.find();
  }

 /* async getById(id: number) {
    const empresa_info = await this.Empresa_infoRepository.findOne(id);
    
    if (!empresa_info) throw new NotFoundException();
    return empresa_info;
  }*/


}
