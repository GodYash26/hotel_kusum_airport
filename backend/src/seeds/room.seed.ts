import { DataSource } from 'typeorm';
import { Room, Roomstatus } from '../rooms/entities/room.entity';


export const roomTypes = [
  {
    name: 'Deluxe Suite',
    type: 'deluxe',
    capacity: 4,
    pricePerNight: 250,
    description: 'Spacious deluxe suite with king-size bed, living area, and stunning city views. Perfect for families or couples seeking luxury.',
    amenities: ['King Bed', 'Living Area', 'City View', 'Mini Bar', 'Smart TV', 'Coffee Machine', 'Free WiFi', 'Room Service'],
    floor: 10,
    isAvailable: true,
  },
  {
    name: 'Executive Room',
    type: 'executive',
    capacity: 2,
    pricePerNight: 180,
    description: 'Modern executive room designed for business travelers with work desk and premium amenities.',
    amenities: ['Queen Bed', 'Work Desk', 'Business Center Access', 'Free WiFi', 'Smart TV', 'Coffee Machine', 'Ironing Facilities'],
    floor: 8,
    isAvailable: true,
  },
  {
    name: 'Standard Room',
    type: 'standard',
    capacity: 2,
    pricePerNight: 100,
    description: 'Comfortable standard room with all essential amenities for a pleasant stay.',
    amenities: ['Double Bed', 'Free WiFi', 'TV', 'Air Conditioning', 'Private Bathroom', 'Daily Housekeeping'],
    floor: 3,
    isAvailable: true,
  },
  {
    name: 'Presidential Suite',
    type: 'presidential',
    capacity: 6,
    pricePerNight: 500,
    description: 'Luxurious presidential suite with separate bedroom, dining area, and panoramic views. Ultimate comfort and elegance.',
    amenities: ['Master Bedroom', 'Guest Bedroom', 'Dining Area', 'Panoramic View', 'Jacuzzi', 'Butler Service', 'Private Bar', 'Smart Home System', 'Free WiFi'],
    floor: 15,
    isAvailable: true,
  },
  {
    name: 'Family Room',
    type: 'family',
    capacity: 5,
    pricePerNight: 200,
    description: 'Spacious family room with multiple beds and kid-friendly amenities. Perfect for family vacations.',
    amenities: ['Two Double Beds', 'Kids Play Area', 'Free WiFi', 'Smart TV', 'Mini Fridge', 'Family Bathroom', 'Game Console', 'Complimentary Breakfast'],
    floor: 5,
    isAvailable: true,
  },
];

export async function seedRooms(dataSource: DataSource): Promise<void> {
  const roomRepository = dataSource.getRepository(Room);

  // Check if rooms already exist
  const existingRooms = await roomRepository.count();
  if (existingRooms > 0) {
    console.log('Rooms already seeded. Skipping...');
    return;
  }

  // Create multiple instances of each room type (e.g., 3 rooms per type)
  const roomsToSeed: Partial<Room>[] = [];
  
  roomTypes.forEach((roomType, index) => {
    for (let i = 1; i <= 3; i++) {
      roomsToSeed.push({
        name: `${roomType.name} ${i}`,
        type: roomType.type,
        capacity: roomType.capacity,
        pricePerNight: roomType.pricePerNight,
        description: roomType.description,
        amenities: roomType.amenities,
        floor: roomType.floor + Math.floor((i - 1) / 2), // Vary floors slightly
        status: Roomstatus.AVAILABLE,
      });
    }
  });

  // Insert all rooms
  await roomRepository.save(roomsToSeed);
  console.log(`✅ Successfully seeded ${roomsToSeed.length} rooms (${roomTypes.length} types)`);
}
