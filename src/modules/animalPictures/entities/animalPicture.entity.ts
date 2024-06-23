import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Animal } from '../../animals/entities/animal.entity';
  
@Entity('animalPictures')
export class AnimalPicture {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Animal)
    @JoinColumn({ name: 'animalId', referencedColumnName: 'id' })
    animal: Animal;
  
    @Column()
    filename: string;
  
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
