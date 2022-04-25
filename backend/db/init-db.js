import mongoose from 'mongoose';
import { GameData } from './schema';
import game730 from '../gameData.json';

// This is a standalone program which will populate the database with initial data.
async function run() {
    console.log('Connecting to database...');
    await mongoose.connect('mongodb://localhost:27017/gamebox');

    // Clear db
    await GameData.deleteMany({});

    await GameData.insertMany(game730);
    GameData.create()

    await mongoose.disconnect();
    console.log('Done!');
}

run();