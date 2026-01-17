import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { seedRooms } from './room.seed';
import { Room } from '../rooms/entities/room.entity';

// Load environment variables
config();

const configService = new ConfigService();

async function runSeeds() {
  const dataSource = new DataSource({
    type: 'mongodb',
    url: configService.get<string>('DATABASE_URL'),
    synchronize: true,
    logging: true,
    entities: [Room],
  });

  try {
    await dataSource.initialize();
    console.log('🔗 Database connected successfully');

    console.log(' Starting seed process...');
    
    // Run room seeds
    await seedRooms(dataSource);

    console.log(' All seeds completed successfully!');
  } catch (error) {
    console.error(' Error during seeding:', error);
    throw error;
  } finally {
    await dataSource.destroy();
    console.log('🔌 Database connection closed');
  }
}

runSeeds()
  .then(() => {
    console.log('✅ Seeding process finished');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding process failed:', error);
    process.exit(1);
  });
