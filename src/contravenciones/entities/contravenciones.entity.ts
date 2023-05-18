import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contravenciones {

    @PrimaryGeneratedColumn()
    con_id: number;

    @CreateDateColumn({ type: 'timestamp' })
    con_fecha_desde: Date;

    @CreateDateColumn({ type: 'timestamp' })
    con_fecha_hasta: Date;

    @Column({ type: 'varchar', length: 200 , default: "" })
    con_observaciones: string;

    @Column({ type: 'int' })
    usu_id: number;
    
}