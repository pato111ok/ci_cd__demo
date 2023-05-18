import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { type } from 'os';
import { Perfiles } from 'src/perfil/entities/perfiles.entity';

@Entity()
export class Usuarios extends BaseEntity {
  @PrimaryGeneratedColumn()
  usu_id: number;

  @Column({ type: 'varchar', length: 11 })
  usu_cedula: string;

  @Column({ type: 'varchar', length: 50 })
  usu_nombre: string;

  @Column({ type: 'varchar', length: 50 })
  usu_apellido: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  usu_foto: string;

  @Column({ type: 'blob', default: null })
  usu_huella: string;

  @Column({ type: 'int', default: 0 })
  usu_tipo: number;

  @Column({ type: 'int', default: 1 })
  usu_estado: number;

  @Column({ type: 'varchar', length: 255 })
  usu_clave: string;

  @Column({ type: 'int', default: 1 })
  per_id: number;

  @Column({ type: 'varchar', default: null, length: 40 })
  usu_email: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.usu_clave.length != 0) {
      this.usu_clave = await bcrypt.hash(this.usu_clave, 8);
    }
  }

  // @BeforeUpdate()
  // async hashPass() {
  //   this.usu_clave = await bcrypt.hash(this.usu_clave, 8);
  // }

  async validatePassword(usu_clave: string): Promise<boolean> {
    return bcrypt.compare(usu_clave, this.usu_clave);
  }
}
