import mongoose from 'mongoose';
import { GameData } from './schema';

import game440 from '../gamedata/game440.json';
import game570 from '../gamedata/game570.json';
import game730 from '../gamedata/game730.json';
import game252490 from '../gamedata/game252490.json';
import game271590 from '../gamedata/game271590.json';
import game578080 from '../gamedata/game578080.json';
import game1172470 from '../gamedata/game1172470.json';
import game1203220 from '../gamedata/game1203220.json';
import game1245620 from '../gamedata/game1245620.json';
import game1599340 from '../gamedata/game1599340.json';

// This is a standalone program which will populate the database with initial data.
async function run() {
    console.log('Connecting to database...');
    await mongoose.connect('mongodb://localhost:27017/gamebox');

    // Clear db
    await GameData.deleteMany({});

    await GameData.insertMany(game440);
    await GameData.insertMany(game570);
    await GameData.insertMany(game730);
    await GameData.insertMany(game252490);
    await GameData.insertMany(game271590);
    await GameData.insertMany(game578080);
    await GameData.insertMany(game1172470);
    await GameData.insertMany(game1203220);
    await GameData.insertMany(game1245620);
    await GameData.insertMany(game1599340);

    GameData.create()

    await mongoose.disconnect();
    console.log('Done!');
}

run();