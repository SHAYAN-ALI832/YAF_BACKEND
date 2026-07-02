import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './src/Model/user.js';
import connectDB from './src/Config/db.js';

dotenv.config();

const seedUsers = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Clear out any existing users so we don't get duplicate errors
    await User.deleteMany();
    console.log('🗑️ Existing users cleared.');

    // Helper function to easily hash passwords right here
    const hashPassword = async (password) => {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    };

    // Create the 4 seed users required by your specification guide
    const users = [
      {
        username: 'admin@yousafzaigroup.com',
        password: await hashPassword('Admin@2025'),
        role: 'SuperAdmin',
        brandId: null, // Global access across all brands
      },
      {
        username: 'corp',
        password: await hashPassword('corp123'),
        role: 'BrandManager',
        brandId: 0, // Scoped to Corporate brand
      },
      {
        username: 'trade',
        password: await hashPassword('trade123'),
        role: 'BrandManager',
        brandId: 1, // Scoped to Trade brand
      },
      {
        username: 'supply',
        password: await hashPassword('supply123'),
        role: 'BrandManager',
        brandId: 2, // Scoped to Supply brand
      },
    ];

    // Insert them into MongoDB
    await User.insertMany(users);
    console.log('🌱 Development users seeded successfully!');
    
    // Close the database connection automatically when done
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedUsers();