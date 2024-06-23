import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Tutor } from '../../tutors/entities/tutor.entity';
import { Campaign } from '../../campaings/entities/campaign.entity';
  
@Entity('donations')
export class Donation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Tutor)
    @JoinColumn({ name: 'tutorId', referencedColumnName: 'id' })
    tutor: Tutor;

    @ManyToOne(() => Campaign)
    @JoinColumn({ name: 'campaignId', referencedColumnName: 'id' })
    campaign: Campaign;

    @Column()
    status: string;

    @Column()
    donationDate: string;

    @Column()
    amount: string;

    @Column()
    tutorId: string;

    @Column()
    campaignId: string;

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
