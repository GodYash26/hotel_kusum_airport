import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room, Roomstatus } from 'src/rooms/entities/room.entity';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class BookingsService {

  constructor(
    @InjectRepository(Room) private readonly roomRepo: Repository<Room>,
    @InjectRepository(Booking) private readonly bookingRepo: Repository<Booking>,
  ) { }

  // Temporarily reserve a room for 10 minutes when user clicks/selects it
  async reserveRoom(dto: CreateBookingDto) {
    const room = await this.roomRepo.findOne({ where: { _id: new ObjectId(dto.roomId) } });
    
    if (!room) {
      throw new BadRequestException('Room not found');
    }

    if (room.status !== Roomstatus.AVAILABLE) {
      throw new BadRequestException('Room is not available for reservation');
    }

    // Set expiration time to 10 minutes from now
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    // Create temporary booking with PENDING status
    const booking = this.bookingRepo.create({
      fullName: dto.fullName,
      email: dto.email,
      phoneNumber: dto.phoneNumber, 
      room: room,
      checkInDate: new Date(dto.checkInDate),
      checkOutDate: new Date(dto.checkOutDate),
      adults: dto.adults,
      children: dto.children || 0,
      status: BookingStatus.PENDING,
      reservationExpiresAt: expiresAt,
    });

    // Update room status to RESERVED
    room.status = Roomstatus.RESERVED;
    await this.roomRepo.save(room);

    return this.bookingRepo.save(booking);
  }

  // Confirm booking after payment
  async createBooking(dto: CreateBookingDto) {
    const room = await this.roomRepo.findOne({ where: { _id: new ObjectId(dto.roomId) } });
    
    if (!room) {
      throw new BadRequestException('Room not found');
    }

    if (room.status === Roomstatus.BOOKED) {
      throw new BadRequestException('Room is already booked');
    }

    const booking = this.bookingRepo.create({
      room: room,
      checkInDate: new Date(dto.checkInDate),
      checkOutDate: new Date(dto.checkOutDate),
      adults: dto.adults,
      children: dto.children || 0,
      status: BookingStatus.CONFIRMED,
    });

    // Update room status to BOOKED
    room.status = Roomstatus.BOOKED;
    await this.roomRepo.save(room);

    return this.bookingRepo.save(booking);
  }

  // Release expired reservations
  async releaseExpiredReservations() {
    const now = new Date();
    const expiredBookings = await this.bookingRepo.find({
      where: {
        status: BookingStatus.PENDING,
      },
    });

    for (const booking of expiredBookings) {
      if (booking.reservationExpiresAt && booking.reservationExpiresAt < now) {
        // Cancel the booking
        booking.status = BookingStatus.CANCELLED;
        await this.bookingRepo.save(booking);

        // Release the room
        const room = await this.roomRepo.findOne({ where: { _id: booking.room._id } });
        if (room && room.status === Roomstatus.RESERVED) {
          room.status = Roomstatus.AVAILABLE;
          await this.roomRepo.save(room);
        }
      }
    }
  }

  findAll() {
    return `This action returns all bookings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
