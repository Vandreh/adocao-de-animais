import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ONG } from '../../ongs/entities/ong.entity';
import { Address } from '../../address/entities/address.entity';
  
@Entity('events')
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ONG)
    @JoinColumn({ name: 'ongId', referencedColumnName: 'id' })
    ong: ONG;

    @ManyToOne(() => Address)
    @JoinColumn({ name: 'addressId', referencedColumnName: 'id' })
    address: Address;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    type: string;

    @Column()
    phone: string;

    @Column()
    description: string;

    @CreateDateColumn({ type: 'timestamp' })
    date: Date;
  
    @Column()
    isApproved: boolean;
    
    @Column()
    picture: string;
    
    @Column()
    ongId: string;

    @Column()
    addressId: string;

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
