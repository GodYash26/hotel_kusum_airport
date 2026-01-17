import { Room } from "src/rooms/entities/room.entity";
import { Column, Entity, ManyToOne, ObjectId, ObjectIdColumn, CreateDateColumn } from "typeorm";

export enum BookingStatus {
    PENDING = 'pending',     // selected room, payment not done
    CONFIRMED = 'confirmed', // payment success
    CANCELLED = 'cancelled', // failed / timeout
}


@Entity('bookings')
export class Booking {
    @ObjectIdColumn()
    _id: ObjectId;

     @Column()
    fullName: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    /* Booking Details */
    @ManyToOne(() => Room, { eager: true })
    room: Room;

    @Column({ type: 'date' })
    checkInDate: Date;

    @Column({ type: 'date' })
    checkOutDate: Date;

    @Column()
    adults: number;

    @Column({ default: 0 })
    children: number;

    @Column({
        type: 'enum',
        enum: BookingStatus,
        default: BookingStatus.PENDING,
    })
    status: BookingStatus;

    @Column({ nullable: true })
    reservationExpiresAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}
