import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { ONG } from '../../ongs/entities/ong.entity';
import { AnimalPicture } from '../../animalPictures/entities/animalPicture.entity';
  
@Entity('animals')
export class Animal {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ONG)
    @JoinColumn({ name: 'ongId', referencedColumnName: 'id' })
    ong: ONG;

    @OneToMany(() => AnimalPicture, animalPicture => animalPicture.animal, {
        cascade: true
    })
    @JoinColumn()
    animalPictures: AnimalPicture[]

    @Column()
    name: string;

    @Column()
    castrated: boolean;

    @Column()
    hasVermifugation: boolean;

    @Column()
    vaccinated: boolean;

    @Column()
    hasInjuries: boolean;

    @Column()
    state: string;

    @Column()
    city: string;

    @Column()
    observation: string;

    @Column()
    sexo: string;

    @Column()
    size: string;

    @Column()
    species: string;

    @CreateDateColumn({ type: 'timestamp' })
    bornDate: Date;

    @Column()
    raca: string;

    @Column()
    shelterEnterDate: Date;

    @Column()
    costsDescription: string;

    @Column()
    monthlyCosts: Number

    @Column()
    isAvailable: boolean;

    @Column()
    adoptionDate: Date;

    @Column()
    ongId: string;

    @Column()
    avatar: string;

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
