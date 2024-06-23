import { Tutor } from '../../tutors/entities/tutor.entity';
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
  
@Entity('tutorsNotifications')
export class TutorNotification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Tutor)
    @JoinColumn({ name: 'tutorId', referencedColumnName: 'id' })
    tutor: Tutor;
  
    @Column()
    read: boolean;
  
    @Column()
    subject: string;

    @Column()
    tutorId: string;

    @Column()
    ongPicture: string;
  
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
