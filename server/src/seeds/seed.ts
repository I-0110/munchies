import db from '../config/connection.js';
import cleanDB from './cleanDB.js';


const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error seeding database:', error.message);
    } else {
      console.error('Unknown error seeding database');
    }
    process.exit(1);
  }
};

seedDatabase();
