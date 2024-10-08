// testUserCreation.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const createUser = async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const username = 'testuser';
    const password = 'testpassword';

    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        const newUser = await User.create({ username, password: hashedPassword });
        console.log('User created:', newUser);
    } catch (error) {
        console.error('Error creating user:', error);
    } finally {
        await mongoose.connection.close();
    }
};

createUser();
