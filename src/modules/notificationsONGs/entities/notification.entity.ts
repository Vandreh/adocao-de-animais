import { ONG } from '../../ongs/entities/ong.entity';
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
  
@Entity('ongsNotifications')
export class ONGNotification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ONG)
    @JoinColumn({ name: 'ongId', referencedColumnName: 'id' })
    ong: ONG;
  
    @Column()
    read: boolean;
  
    @Column()
    subject: string;

    @Column()
    ongId: string;
  
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
