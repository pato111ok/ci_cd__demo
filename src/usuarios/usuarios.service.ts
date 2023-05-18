import { ReadUsuariosDto } from './dtos/read-usuarios.dto';
/* eslint-disable prettier/prettier */
import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { CreateUsuariosDTO } from './dtos/create-usuarios.dto';
import { EditUsuariosDTO } from './dtos/edit-usuarios.dto';
import { Usuarios } from './entities/usuarios.entity';
import * as _ from 'lodash';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { Observable } from 'rxjs';


@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly UsuariosRepository: Repository<Usuarios>,
    private http: HttpService,
  ) {}

  async getAll() {
    return await getManager()
      .createQueryBuilder('usuarios', 'u')
      .addSelect('p.per_nombre', 'u_rol')
      .innerJoin('perfiles', 'p', 'u.per_id = p.per_id')
      .where('p.per_id != 4 and p.per_id != 2')
      .getRawMany();
  }

  async getUsers(): Promise<ReadUsuariosDto[]> {
    const users = await getManager()
      .createQueryBuilder('usuarios', 'u')
      .select('u.*')
      .addSelect('p.per_nombre', 'per_name')
      .innerJoin('perfiles', 'p', 'u.per_id = p.per_id')
      .where('p.per_id != 4')
      .getRawMany();
    return users.map((user: Usuarios) => plainToClass(ReadUsuariosDto, user));
  }

  async getEmployes(): Promise<ReadUsuariosDto[]> {
    const users = await getManager()
      .createQueryBuilder('usuarios', 'u')
      .select('u.*')
      .addSelect('p.per_nombre', 'per_name')
      .innerJoin('perfiles', 'p', 'u.per_id = p.per_id')
      .where('u.per_id <= 3 and u.per_id != 2')
      .getRawMany();
    return users.map((user: Usuarios) => plainToClass(ReadUsuariosDto, user));
  }

  async getAdmins() {
    const users = await getManager()
      .createQueryBuilder('usuarios', 'u')
      .select('u.*')
      .addSelect('p.per_nombre', 'per_name')
      .innerJoin('perfiles', 'p', 'u.per_id = p.per_id')
      .where('u.per_id != 4 and u.per_id >=2')
      .getRawMany();
    return users.map((user: Usuarios) => plainToClass(ReadUsuariosDto, user));
  }

  async getAct() {
    return await getManager()
      .createQueryBuilder('usuarios', 'u')
      .addSelect('p.per_nombre', 'u_rol')
      .innerJoin('perfiles', 'p', 'u.per_id = p.per_id')
      .where('p.per_id <> 4')
      .andWhere(' u.usu_estado = 1')
      .getRawMany();
  }
  async getInac() {
    return await getManager()
      .createQueryBuilder('usuarios', 'u')
      .addSelect('p.per_nombre', 'u_rol')
      .innerJoin('perfiles', 'p', 'u.per_id = p.per_id')
      .where('p.per_id <> 4 ')
      .andWhere(' u.usu_estado = -1')
      .getRawMany();
  }

  async create(usuario: CreateUsuariosDTO) {
    usuario.usu_huella = usuario.usu_huella.toString();
    const cedula = await this.UsuariosRepository.findOne({
      usu_cedula: usuario.usu_cedula,
    });
    let correo = false;
    if (usuario.per_id != 1 && usuario.usu_email) {
      if (
        await this.UsuariosRepository.findOne({ usu_email: usuario.usu_email })
      ) {
        correo = true;
      }
    }
    if (cedula) {
      return { msg: false, error: 'La cédula ya esta registrada..!!' };
    } else {
      if (correo) {
        return { msg: false, error: 'El correo ya esta registrado..!!' };
      } else {
        if (!usuario.usu_email && usuario.per_id != 1) {
          return {
            msg: false,
            error: 'El usuario necesita un correo electronico..!!',
          };
        }
        const UsuariosCreated = this.UsuariosRepository.create(usuario as any);
        const user = await this.UsuariosRepository.save(UsuariosCreated);
        return { msg: true, data: plainToClass(ReadUsuariosDto, user) };
      }
    }
  }

  async getById(id: number) {
    const perfil = await this.UsuariosRepository.findOne(id);
    if (!perfil) throw new NotFoundException();
    return perfil;
  }

  async edit(id: number, usuario: EditUsuariosDTO): Promise<ReadUsuariosDto> {
    const user = await this.UsuariosRepository.findOne({ usu_id: id });
    if (!user) {
      throw new NotFoundException('Usuario no registrado..!!');
    } else {
      await this.getCoincidencesCI(usuario, id).then((result) => {
        if (result) {
          throw new NotFoundException('Cédula ya registrada..!!');
        }
      });
      if (usuario.per_id != 1) {
        await this.getCoincidencesEmail(usuario, id).then((resultEmail) => {
          if (resultEmail) {
            throw new NotFoundException('Correo electrónico ya registrado..!!');
          }
        });
        const editeUser = Object.assign(user, usuario);
        return await plainToClass(
          ReadUsuariosDto,
          this.UsuariosRepository.save(editeUser),
        );
      } else {
        usuario.usu_email = '';
        const editeUser = Object.assign(user, usuario);
        return await plainToClass(
          ReadUsuariosDto,
          this.UsuariosRepository.save(editeUser),
        );
      }
    }
  }

  async updateUser(userId: number, data: any): Promise<ReadUsuariosDto> {
    const user = await this.UsuariosRepository.findOne({ usu_id: userId });
    if(!user) {
      throw new NotFoundException('No existe el usuario registrado ..!');
    }
    await this.getCoincidencesCI(data, userId).then((result) => {
      if (result) {
        throw new NotFoundException('Cédula ya registrada..!!');
      }
    });
    delete data.usu_clave;
    if (data.per_id != 1) {
      await this.getCoincidencesEmail(data, userId).then((resultEmail) => {
        if (resultEmail) {
          throw new NotFoundException('Correo electrónico ya registrado..!!');
        }
      });
      const editeUser = Object.assign(user, data);
      return await plainToClass(
        ReadUsuariosDto,
        this.UsuariosRepository.save(editeUser),
      );
    } else {
      data.usu_email = '';
      const editeUser = Object.assign(user, data);
      return await plainToClass(
        ReadUsuariosDto,
        this.UsuariosRepository.save(editeUser),
      );
    }
  }

  async deleteById(userId: number): Promise<ReadUsuariosDto> {
    const usuario = await this.UsuariosRepository.findOne(userId);
    if (!usuario) {
      throw new NotFoundException('Usuario no registrado..!!');
    } else {
      // const del = await this.UsuariosRepository.delete(userId);
      const editeUser = Object.assign(usuario, { usu_estado: -1 });
      return await plainToClass(
        ReadUsuariosDto,
        this.UsuariosRepository.save(editeUser),
      );
    }
  }

  async searchUsuario(searchUser: string) {
    let re = searchUser; /*new RegExp(searchUser, 'i');*/
    re = '%' + re + '%';
    //const resultSearch = await this.UsuariosRepository.find( usu_nombre:  { $regex: re });
    return await getManager()
      .createQueryBuilder('usuarios', 'u')
      .select('u.usu_cedula', 'cedula')
      .addSelect('CONCAT(u.usu_nombre," ", u.usu_apellido)', 'nom_ape_usu')
      .where('CONCAT(u.usu_nombre," ", u.usu_apellido) LIKE :buscar  ', {
        buscar: re,
      })
      .getRawMany();
  }

  async showById(userId: number): Promise<ReadUsuariosDto> {
    const user = await this.findById(userId);
    return plainToClass(ReadUsuariosDto, user);
  }

  async findById(id: number) {
    return await plainToClass(
      ReadUsuariosDto,
      this.UsuariosRepository.findOne(id),
    );
    // return plainToClass(ReadUsuariosDto, user );
  }

  async findByEmail(email: string) {
    return await this.UsuariosRepository.findOne({
      where: {
        usu_cedula: email,
      },
    });
  }

  async changePass(credencitials) {
    console.log(credencitials);
    const user = await getManager()
      .getRepository(Usuarios)
      .createQueryBuilder()
      .where('usu_id = :userId', { userId: credencitials.usu_id })
      .getOne();
    if (!user) {
      throw new NotFoundException('Usuario no registrado....!');
    }
    if (!(await user?.validatePassword(credencitials.usu_clave))) {
      throw new NotFoundException(
        'La clave actual no coincide con la ingresada...!',
      );
    }
    const editeUser = Object.assign(user, {
      usu_clave: await bcrypt.hash(credencitials.new_clave, 8),
    });
    return await plainToClass(
      ReadUsuariosDto,
      this.UsuariosRepository.save(editeUser),
    );
  }

  async recoveryPass(usu_email): Promise<any> {
    const user = await this.UsuariosRepository.findOne({
      where: { usu_email },
    });
    if (!user) {
      throw new NotFoundException(
        'El correo proporcionado no pertenece a ningún usuario registrado .....!',
      );
    }
    const code = this.getRamdon(5);
      const editeUser = Object.assign(user, {
        usu_clave: await bcrypt.hash(code, 8),
      });
      const us = await this.UsuariosRepository.save(editeUser);
      if( us ) {
        return code
      } else {
        return false
      }
  }

  async getPerfilUser(id: number) {
    return await getManager()
      .createQueryBuilder('usuarios', 'u')
      .addSelect('p.per_nombre', 'u_rol')
      .innerJoin('perfiles', 'p', 'u.per_id = p.per_id')
      .where('u.usu_id = :buscar', { buscar: id })
      .getRawMany();
  }

  async getCoincidencesCI(usuario, userId) {
    const res = await getManager()
      .getRepository(Usuarios)
      .createQueryBuilder()
      .where('usu_cedula = :cedula and usu_id != :id ', {
        cedula: usuario.usu_cedula,
        id: userId,
      })
      .getMany();
    if (res.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async getCoincidencesEmail(usuario, userId): Promise<any> {
    const res = await getManager()
      .getRepository(Usuarios)
      .createQueryBuilder()
      .where('usu_email = :email and usu_id != :id ', {
        email: usuario.usu_email,
        id: userId,
      })
      .getMany();
    if (res.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  sendEmail(recevier, body): Observable<any> {
    const url = 'http://45.76.250.195:8443/enviarCorreo/send';
    const dto = {
      sender_mail: 'coopflordelvalleinfo@gmail.com',
      sender_password: 'info2021@fdv',
      entity_mail: '',
      receiver: recevier,
      subject: 'Recuperación de contraseña sistema Flor del valle.',
      text: 'Flor del valle',
      body: '<p>Código temporal para el ingreso al sistema flor del valle: <p>' + body,
    };
    return this.http.post(url, dto);
  }

  getRamdon(longitud) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1 = '';
    const charactersLength = characters.length;
    for (let i = 0; i < longitud; i++) {
      result1 += characters.charAt(
        Math.floor(Math.random() * charactersLength),
      );
    }
    return result1;
  }
}
