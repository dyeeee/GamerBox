import express from "express";
import axios from 'axios'

const router = express.Router();

// Gets steam news
router.get('/getNews', async (req, res) => {
    const axios = require('axios');
    //这个api返回结果就是一个json，所以可以直接用res.send       且可以直接访问json中的各节点
    axios.get(' http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=440&count=3&maxlength=300&format=json')
        .then(response =>{
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
        });
});

// Adds a new order
router.post('/', async (req, res) => {

});

export default router;