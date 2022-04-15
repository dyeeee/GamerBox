import express from "express";
import axios from "axios";
import https from 'https';

const router = express.Router();
axios.defaults.timeout = 30000;
axios.defaults.httpsAgent = new https.Agent({ keepAlive: true});

// Gets steam news
router.post('/getNews', async (req, res) => {
    //这个api返回结果就是一个json，所以可以直接用res.send       且可以直接访问json中的各节点
    const appid = req.body.appid;
    const count = req.body.count;
    console.log('https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?access_token=51cff501b898a0d16c3b287284c04e48&appid='+appid+'&count='+count)
    axios.get('https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?access_token=51cff501b898a0d16c3b287284c04e48&appid='+appid+'&count='+count)
        .then(response =>{
            res.json(response.data.appnews.newsitems);
        })
        .catch(error => {
            console.log(error);
        });
});


export default router;