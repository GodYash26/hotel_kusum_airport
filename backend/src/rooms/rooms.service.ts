import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room, Roomstatus } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(Room) private readonly roomRepo: Repository<Room>,
    ) { }

    async searchAvailableRoom(
        checkInDate: Date | string,
        checkOutDate: Date | string,
        capacity: number,
    ): Promise<Room[]> {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
            throw new BadRequestException('Invalid date format');
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (checkIn < today || checkOut < today) {
            throw new BadRequestException('Dates cannot be in the past');
        }

        if (checkOut <= checkIn) {
            throw new BadRequestException('checkOutDate must be after checkInDate');
        }

        const rooms = await this.roomRepo.find({
            where: {
                status: Roomstatus.AVAILABLE,
            },
        });

        return rooms.filter((r) => r.capacity >= capacity);
    }

    async getAllRooms(): Promise<Room[]> {
        const rooms = await this.roomRepo.find()

        if (!rooms || rooms.length === 0) {
            throw new BadRequestException('No rooms found');
        }

        return rooms;
    }
}
