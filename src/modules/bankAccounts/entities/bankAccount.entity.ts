import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ONG } from '../../ongs/entities/ong.entity';
  
@Entity('bankAccounts')
export class BankAccount {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ONG)
    @JoinColumn({ name: 'ongId', referencedColumnName: 'id' })
    ong: ONG;

    @Column()
    name: string;

    @Column()
    document: string;

    @Column()
    documentType: string;

    @Column()
    bankNumber: string;

    @Column()
    accountNumber: string;

    @Column()
    agencyNumber: string;

    @Column()
    accountType: string;

    @Column()
    ongId: string;

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
