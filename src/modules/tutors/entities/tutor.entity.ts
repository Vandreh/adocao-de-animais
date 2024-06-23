import { TutorNotification } from '../../notificationsTutors/entities/notification.entity';
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
  
@Entity('tutors')
export class Tutor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => TutorNotification, tutorNotification => tutorNotification.tutor, {
        cascade: true
    })
    @JoinColumn()
    tutorNotifications: TutorNotification[]
  
    @Column()
    cpf: string;
  
    @Column()
    description: string;

    @Column()
    avatar: string;
    
    @Column()
    banner: string;

    @Column()
    adoptionRequirements: number;
  
    @Column()
    user_id: string;
  
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
