import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb';


export enum Roomstatus {
    AVAILABLE = 'available',
    BOOKED = 'booked',
    RESERVED = 'reserved',
}

@Entity('rooms')
export class Room {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  capacity: number;

  @Column()
  pricePerNight: number;

  @Column()
  description: string;

  @Column('simple-array')
  amenities: string[];

  @Column()
  floor: number;

  @Column({ type: 'enum', enum: Roomstatus, default: Roomstatus.AVAILABLE })
  status: Roomstatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
