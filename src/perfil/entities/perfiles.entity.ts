import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Perfiles {
  @PrimaryGeneratedColumn()
  per_id: number;

  @Column({ type: 'varchar', length: 25 })
  per_nombre: string;

  @Column({ type: 'varchar', length: 100 })
  per_descripcion: string;

  @Column({ type: 'int', default: 1 })
  per_estado: number;

  /*@Column({ type: 'bool', default: true })
    state: boolean;

    @Column({ type: 'varchar', length: 255 })
    category: string;*/

  /*@CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;*/
}
