import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Tutor } from '../../tutors/entities/tutor.entity';
import { Address } from '../../address/entities/address.entity';
  
@Entity('creditCards')
export class CreditCard {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Tutor)
    @JoinColumn({ name: 'tutorId', referencedColumnName: 'id' })
    tutor: Tutor;

    @Column()
    creditCardId: 'Credito' | 'Debito';

    @Column()
    last4CardNumber: string;

    @Column()
    expirationMonth: string;

    @Column()
    expirationYear: string;

    @Column()
    name: string;

    @Column()
    brand: string;
    
    @Column()
    tutorId: string;

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
