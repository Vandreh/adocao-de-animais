import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Tutor } from '../../tutors/entities/tutor.entity';
import { Animal } from '../../animals/entities/animal.entity';
  
@Entity('adoptions')
export class Adoption {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Tutor)
    @JoinColumn({ name: 'tutorId', referencedColumnName: 'id' })
    tutor: Tutor;

    @ManyToOne(() => Animal)
    @JoinColumn({ name: 'animalId', referencedColumnName: 'id' })
    animal: Animal;

    @Column()
    status: string;
  
    @Column()
    description: string;

    @Column()
    tutorId: string;

    @Column()
    animalId: string;

    @CreateDateColumn({ type: 'timestamp' })
    requestDate: Date;

    @CreateDateColumn({ type: 'timestamp' })
    conclusionDate: Date;
  
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
