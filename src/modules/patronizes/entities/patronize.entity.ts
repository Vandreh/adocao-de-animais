import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Tutor } from '../../tutors/entities/tutor.entity';
import { Animal } from '../../animals/entities/animal.entity';
import { Signature } from '../../signatures/entities/signature.entity';
  
@Entity('patronizes')
export class Patronize {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Tutor)
    @JoinColumn({ name: 'tutorId', referencedColumnName: 'id' })
    tutor: Tutor;

    @ManyToOne(() => Animal)
    @JoinColumn({ name: 'animalId', referencedColumnName: 'id' })
    animal: Animal;

    @ManyToOne(() => Signature)
    @JoinColumn({ name: 'signatureId', referencedColumnName: 'id' })
    signature: Signature;

    @Column()
    status: string;

    @Column()
    description: string;

    @Column()
    conclusion_date: string;

    @Column()
    planName: string;

    @Column()
    planAmount: string;

    @Column()
    planId: string;

    @Column()
    signatureId: string;

    @Column()
    tutorId: string;

    @Column()
    animalId: string;

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
