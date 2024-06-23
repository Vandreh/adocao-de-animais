import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Patronize } from '../../patronizes/entities/patronize.entity';
  
@Entity('receipts')
export class Receipt {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Patronize)
    @JoinColumn({ name: 'patronizeId', referencedColumnName: 'id' })
    patronize: Patronize;

    @Column()
    status: string;

    @Column()
    description: string;

    @Column()
    creation_date: string;

    @Column()
    transfer_date: string;

    @Column()
    patronizeId: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @CreateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @CreateDateColumn({ type: 'timestamp' })
    deleted_at: Date;
  
    @BeforeInsert()
    generatedId() {
        if (this.id) {
            return;
        }
  
        this.id = uuidv4();
    }
}
