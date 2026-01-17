import { IsNotEmpty, IsDateString, IsNumber, IsOptional, Min, IsString } from 'class-validator';
import { ObjectId } from 'typeorm';

export class CreateBookingDto {

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;


    @IsNotEmpty()
    roomId: ObjectId;

    @IsNotEmpty()
    @IsDateString()
    checkInDate: string;

    @IsNotEmpty()
    @IsDateString()
    checkOutDate: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    adults: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    children?: number;
}
