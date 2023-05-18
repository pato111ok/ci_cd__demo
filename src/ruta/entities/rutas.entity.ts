import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Rutas {
  @PrimaryGeneratedColumn()
  rut_id: number;

  @Column({ type: 'varchar', length: 50 })
  rut_origen: string;

  @Column({ type: 'varchar', length: 50 })
  rut_destino: string;

  @Column({ type: 'int', default: 1 })
  rut_estado: number;

  /*@Column({ type: 'bool', default: true })
    state: boolean;

    @Column({ type: 'varchar', length: 255 })
    category: string;*/

  /*@CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;*/
}
