import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Viajes {

    @PrimaryGeneratedColumn()
    via_id: number;

    @Column({ type: 'varchar', length: 20 , default: "" })
    via_fecha: string;

    @Column({ type: 'varchar', length: 15 , default: "" })
    via_hora: string;

    @Column({ type: 'varchar', length: 11 , default: "" })
    conductor_id: string;

    @Column({ type: 'varchar', length: 11 , default: "" })
    auxiliar_id: string;

    @Column({ type: 'int' })
    uni_id: number;

    @Column({ type: 'int' })
    rut_id: number;
    
}