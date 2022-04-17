import express from "express";
import axios from "axios";
import https from 'https';

const router = express.Router();
axios.defaults.timeout = 30000;
axios.defaults.httpsAgent = new https.Agent({ keepAlive: true});
axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;
    // 如果配置不存在或未设置重试选项，则拒绝
    if (!config || !config.retry) return Promise.reject(err);

    // 设置变量以跟踪重试次数
    config.__retryCount = config.__retryCount || 0;

    // 判断是否超过总重试次数
    if (config.__retryCount >= config.retry) {
        // 返回错误并退出自动重试
        return Promise.reject(err);
    }

    // 增加重试次数
    config.__retryCount += 1;

    //打印当前重试次数
    console.log(config.url +' 自动重试第' + config.__retryCount + '次');

    // 创建新的Promise
    var backoff = new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, config.retryDelay || 1);
    });

    // 返回重试请求
    return backoff.then(function () {
        return axios(config);
    });
});

// Gets steam news
router.post('/getNews', async (req, res) => {
    //这个api返回结果就是一个json，所以可以直接用res.send       且可以直接访问json中的各节点
    const appid = req.body.appid;
    const count = req.body.count;
    console.log('https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?access_token=51cff501b898a0d16c3b287284c04e48&appid='+appid+'&count='+count)
    axios.get('https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?access_token=51cff501b898a0d16c3b287284c04e48&appid='+appid+'&count='+count,{
        retry: 5,
        retryDelay: 1000,
        timeout: 6000
    })
        .then(response =>{
            res.json(response.data.appnews.newsitems);
        })
        .catch(error => {
            console.log(error);
        });
});

// Gets number of online players
router.post('/getOnlinePlayer', async (req, res) => {
    //这个api返回结果就是一个json，所以可以直接用res.send       且可以直接访问json中的各节点
    const appid = req.body.appid;
    console.log('https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?access_token=51cff501b898a0d16c3b287284c04e48&appid='+appid)
    axios.get('https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?access_token=51cff501b898a0d16c3b287284c04e48&appid='+appid,{
        retry: 5,
        retryDelay: 1000,
        timeout: 6000
    })
        .then(response =>{
            res.json(response.data.response.player_count);
        })
        .catch(error => {
            console.log(error);
        });
});

// Gets userinfo
router.post('/getUserInfo', async (req, res) => {
    //这个api返回结果就是一个json，所以可以直接用res.send       且可以直接访问json中的各节点
    let api = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=C29734B137600548FE00C77906A76EE5&steamids=';
    const steamids = req.body.steamids;
    console.log(api+steamids)
    axios.get(api+steamids,{
        retry: 5,
        retryDelay: 1000,
        timeout: 6000
    })
        .then(response =>{
            res.json(response.data.response.players);
        })
        .catch(error => {
            console.log(error);
        });
});

//成就部分:

//Get Player Achievements of a game
router.post('/getAchievements', async(req, res) =>{
    const appid = req.body.appid;
    const steamids = req.body.steamids;
    let api = 'https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=C29734B137600548FE00C77906A76EE5&steamid='+steamids+'&appid='+appid;
    console.log(api);
    axios.get(api,{
        retry: 5,
        retryDelay: 1000,
        timeout: 6000
    })
        .then(response =>{
            res.json(response.data.playerstats.achievements);
        })
        .catch(error => {
            console.log(error);
        });
})

//get global achievement percentages for app
router.post('/getGlobalAchievements', async(req, res) =>{
    const appid = req.body.appid;
    let api = 'https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?gameid='+appid;
    console.log(api);
    axios.get(api,{
        retry: 5,
        retryDelay: 1000,
        timeout: 6000
    })
        .then(response =>{
            res.json(response.data.achievementpercentages.achievements);
        })
        .catch(error => {
            console.log(error);
        });
})

//get the name and icon of achievements for app
router.post('/getAchievementsDetail', async(req, res) =>{
    const appid = req.body.appid;
    let api = 'https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=C29734B137600548FE00C77906A76EE5&appid='+appid;
    console.log(api);
    axios.get(api,{
        retry: 5,
        retryDelay: 1000,
        timeout: 6000
    })
        .then(response =>{
            res.json(response.data.game.availableGameStats.achievements);
        })
        .catch(error => {
            console.log(error);
        });
})

//获取玩家库下游戏(里面有icon，配合图床http://media.steampowered.com/steamcommunity/public/images/apps/{appid}/{hash}.jpg使用。也可以用轩宝的大图图床，只需要appid即可)
router.post('/getGamesLibrary', async(req, res) =>{
    const steamids = req.body.steamids;
    let api = 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=C29734B137600548FE00C77906A76EE5&steamid='+steamids+'&include_appinfo=true&include_free_sub=false&include_free_sub=true';
    console.log(api);
    axios.get(api,{
        retry: 5,
        retryDelay: 1000,
        timeout: 6000
    })
        .then(response =>{
            res.json(response.data.response);
        })
        .catch(error => {
            res.status(404).send('Not Found')
        });
})

//user's steam level
router.post('/getUserLevel', async(req, res) =>{
    const steamids = req.body.steamids;
    let api = 'https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=C29734B137600548FE00C77906A76EE5&steamid='+steamids;
    console.log(api);
    axios.get(api,{
        retry: 5,
        retryDelay: 1000,
        timeout: 6000
    })
        .then(response =>{
            res.json(response.data.response.player_level);
        })
        .catch(error => {
            res.status(404).send('Not Found')
        });
})


export default router;