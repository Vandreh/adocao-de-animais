import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ONG } from '../../ongs/entities/ong.entity';
import { BankAccount } from '../../bankAccounts/entities/bankAccount.entity';
  
@Entity('campaigns')
export class Campaign {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ONG)
    @JoinColumn({ name: 'ongId', referencedColumnName: 'id' })
    ong: ONG;

    @ManyToOne(() => BankAccount)
    @JoinColumn({ name: 'accountId', referencedColumnName: 'id' })
    account: BankAccount;

    @Column()
    idCampaign: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    isActive: boolean;

    @Column()
    isApproved: boolean;

    @Column()
    amountExpected: string;
  
    @Column()
    amountCollected: string;
    
    @Column()
    picture: string;
    
    @Column()
    ongId: string;

    @Column()
    accountId: string;

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
