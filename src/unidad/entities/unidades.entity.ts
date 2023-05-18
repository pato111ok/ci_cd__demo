import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Unidades {

    @PrimaryGeneratedColumn()
    uni_id: number;

    @Column({ type: 'int'})
    uni_num_disco: number;

    @Column({ type: 'varchar', length: 10 })
    uni_placa: string;

    @Column({ type: 'int', default: 1 })
    uni_estado: number;

    /*@Column({ type: 'bool', default: true })
    state: boolean;

    @Column({ type: 'varchar', length: 255 })
    category: string;*/

    /*@CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;*/
}