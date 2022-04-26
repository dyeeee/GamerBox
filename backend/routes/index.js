import express from "express";
import {GameData} from "../db/schema"
import steamApi from './steamApi';
import crawler from './crawler';

const router = express.Router();

router.get('/fetchData', async(req, res)=> {
    const data = await GameData.find({});
    res.json(data);
    console.log("123123312"+data);
});

router.get('/fetchData/:gameId', async(req, res)=> {
    const {gameId} = req.params;

    const data = await GameData.find({GameID: gameId});
    res.json(data);
    console.log("123123312"+data);
});

router.use('/steamApi',steamApi);
router.use('/crawler',crawler);

export default router;