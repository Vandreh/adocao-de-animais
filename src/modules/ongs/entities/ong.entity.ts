import { ONGNotification } from '../../notificationsONGs/entities/notification.entity';
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Animal } from '../../animals/entities/animal.entity';
import { Event } from '../../events/entities/event.entity';
  
@Entity('ongs')
export class ONG {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => ONGNotification, ongNotification => ongNotification.ong, {
        cascade: true
    })
    @JoinColumn()
    ongNotifications: ONGNotification[]

    @OneToMany(() => Animal, animal => animal.ong, {
        cascade: true
    })
    @JoinColumn()
    animals: Animal[]

    @OneToMany(() => Event, event => event.ong, {
        cascade: true
    })
    @JoinColumn()
    events: Event[]
  
    @Column()
    cnpj: string;
  
    @Column()
    description: string;

    @Column()
    avatar: string;
    
    @Column()
    banner: string;

    @Column()
    isApproved: boolean;
  
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
