import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { SearchAvailableRoomDto } from './dto/rooms.dto';

@Controller('rooms')
export class RoomsController {
	constructor(private readonly roomsService: RoomsService) {}

	@Get('available')
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
	getAvailable(@Query() query: SearchAvailableRoomDto) {
		const { checkInDate, checkOutDate, capacity } = query;
		return this.roomsService.searchAvailableRoom(checkInDate, checkOutDate, capacity);
	}

    @Get()
    getAllRooms() {
        return this.roomsService.getAllRooms();
    }
}
