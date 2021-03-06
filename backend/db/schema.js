import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const gameDataSchema = new Schema({
    DateTime: String,
    Players: Number,
    PlayersTrend: Number,
    TwitchViewers: Number,
    GameID: String
});

const GameData = mongoose.model('GameData', gameDataSchema);


export { GameData };