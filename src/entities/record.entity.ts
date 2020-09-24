import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Hotel } from './hotel.entity';
import { Room } from './room.entity';
import { User } from './user.entity';

export enum RecordStatus {
  // 已完成
  FINISH = 'finish',
  // 未付款
  UNPAID = 'unpaid',
  // 待入住
  WAITING = 'waiting',
}

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Hotel)
  @JoinColumn()
  hotel: Hotel;

  @OneToOne(type => Room)
  @JoinColumn()
  room: Room;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  create_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_at: Date;

  @Column({ type: 'boolean', default: false })
  is_close: boolean;

  @Column({ length: 1024 })
  member_message: string;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @Column({
    type: 'enum',
    enum: RecordStatus,
    default: RecordStatus.WAITING,
  })
  status: string;

  @Column({ default: 0 })
  coupon: number;

  @Column()
  price: number;
}
