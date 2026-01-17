import { Booking } from "src/bookings/entities/booking.entity";
import { Entity, ObjectIdColumn, ObjectId, ManyToOne, Column, CreateDateColumn } from "typeorm";


export enum PaymentStatus {
    REQUIRES_PAYMENT = 'requires_payment',
    SUCCEEDED = 'succeeded',
    FAILED = 'failed',
}

@Entity('payments')
export class Payment {
    @ObjectIdColumn()
    _id: ObjectId;

    @ManyToOne(() => Booking, { eager: true })
    booking: Booking;

    @Column()
    stripePaymentIntentId: string;

    @Column()
    amount: number; // in cents

    @Column()
    currency: string;

    @Column({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.REQUIRES_PAYMENT,
    })
    status: PaymentStatus;

    @CreateDateColumn()
    createdAt: Date;
}
