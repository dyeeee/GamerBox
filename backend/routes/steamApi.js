import express from "express";
import axios from "axios";
import https from 'https';

const router = express.Router();
axios.defaults.timeout = 30000;
axios.defaults.httpsAgent = new https.Agent({ keepAlive: true });
axios.interceptors.response.use(undefined, function axiosRetryInterceptor (err) {
  var config = err.config;
  // If the configuration does not exist or the retry option is not set, reject it
  if (!config || !config.retry) return Promise.reject(err);

  // Sets the variable to track the number of retries
  config.__retryCount = config.__retryCount || 0;

  // Check whether the total number of retries is exceeded
  if (config.__retryCount >= config.retry) {
    // Returns an error and exits automatic retry
    return Promise.reject(err);
  }

  // add the retry times
  config.__retryCount += 1;

  //print the retry times
  console.log(config.url + ' Automatic retry ' + config.__retryCount + ' times');

  // create new Promise
  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, config.retryDelay || 1);
  });

  // Return retry request
  return backoff.then(function () {
    return axios(config);
  });
});

// Gets steam news
router.post('/getNews', async (req, res) => {
  const appid = req.body.appid;
  const count = req.body.count;
  const feeds = req.body.feeds;
  console.log('https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?access_token=51cff501b898a0d16c3b287284c04e48&appid=' + appid + '&count=' + count + '&feeds=' + feeds)
  axios.get('https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?access_token=51cff501b898a0d16c3b287284c04e48&appid=' + appid + '&count=' + count + '&feeds=' + feeds, {
    retry: 5,
    retryDelay: 1000,
    timeout: 6000
  })
    .then(response => {
      res.json(response.data.appnews.newsitems);
    })
    .catch(error => {
      console.log(error);
    });
});

// Gets number of online players
router.post('/getOnlinePlayer', async (req, res) => {
  const appid = req.body.appid;
  console.log('https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?access_token=51cff501b898a0d16c3b287284c04e48&appid=' + appid)
  axios.get('https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?access_token=51cff501b898a0d16c3b287284c04e48&appid=' + appid, {
    retry: 5,
    retryDelay: 1000,
    timeout: 6000
  })
    .then(response => {
      res.json(response.data.response.player_count);
    })
    .catch(error => {
      console.log(error);
    });
});

// Gets userinfo
router.post('/getUserInfo', async (req, res) => {
  let api = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=C29734B137600548FE00C77906A76EE5&steamids=';
  const steamids = req.body.steamids;
  console.log(api + steamids)
  axios.get(api + steamids, {
    retry: 5,
    retryDelay: 1000,
    timeout: 6000
  })
    .then(response => {
      res.json(response.data.response.players);
    })
    .catch(error => {
      console.log(error);
    });
});

// Gets user's friend list
router.post('/getFriendList', async (req, res) => {
  let api = 'https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=C29734B137600548FE00C77906A76EE5&steamid=';
  const steamids = req.body.steamids;
  console.log(api + steamids)
  axios.get(api + steamids, {
    retry: 5,
    retryDelay: 1000,
    timeout: 6000
  })
    .then(response => {
      res.json(response.data.friendslist.friends);
    })
    .catch(error => {
      res.json({})
      console.log(error);
    });
});

//Get Player Achievements of a game
router.post('/getAchievements', async (req, res) => {
  const appid = req.body.appid;
  const steamids = req.body.steamids;
  let api = 'https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=C29734B137600548FE00C77906A76EE5&steamid=' + steamids + '&appid=' + appid;
  console.log(api);
  axios.get(api, {
    retry: 3,
    retryDelay: 1000,
    timeout: 6000
  })
    .then(response => {
      res.json(response.data.playerstats.achievements);
    })
    .catch(error => {
      res.json(error.response.data.playerstats)
      console.log(error.response.data.playerstats);
    });
})

//get global achievement percentages for app
router.post('/getGlobalAchievements', async (req, res) => {
  const appid = req.body.appid;
  let api = 'https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?gameid=' + appid;
  console.log(api);
  axios.get(api, {
    retry: 5,
    retryDelay: 1000,
    timeout: 6000
  })
    .then(response => {
      res.json(response.data.achievementpercentages.achievements);
    })
    .catch(error => {
      console.log(error);
    });
})

//get the name and icon of achievements for app
router.post('/getAchievementsDetail', async (req, res) => {
  const appid = req.body.appid;
  let api = 'https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=C29734B137600548FE00C77906A76EE5&appid=' + appid;
  console.log(api);
  axios.get(api, {
    retry: 5,
    retryDelay: 1000,
    timeout: 6000
  })
    .then(response => {
      res.json(response.data.game.availableGameStats.achievements);
    })
    .catch(error => {
      res.json({})
      console.log(error);
    });
})

//Get the game from the player library
router.post('/getGamesLibrary', async (req, res) => {
  const steamids = req.body.steamids;
  let api = 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=C29734B137600548FE00C77906A76EE5&steamid=' + steamids + '&include_appinfo=true&include_free_sub=false&include_free_sub=true';
  console.log(api);
  axios.get(api, {
    retry: 5,
    retryDelay: 1000,
    timeout: 6000
  })
    .then(response => {
      res.json(response.data.response);
    })
    .catch(error => {
      res.status(404).send('Not Found')
    });
})

//user's steam level
router.post('/getUserLevel', async (req, res) => {
  const steamids = req.body.steamids;
  let api = 'https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=C29734B137600548FE00C77906A76EE5&steamid=' + steamids;
  console.log(api);
  axios.get(api, {
    retry: 5,
    retryDelay: 1000,
    timeout: 6000
  })
    .then(response => {
      res.json(response.data.response.player_level);
    })
    .catch(error => {
      res.status(404).send('Not Found')
    });
})

//user's steam badge
router.post('/getUserLevel', async (req, res) => {
  const steamids = req.body.steamids;
  let api = 'https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=C29734B137600548FE00C77906A76EE5&steamid=' + steamids;
  console.log(api);
  axios.get(api, {
    retry: 5,
    retryDelay: 1000,
    timeout: 6000
  })
    .then(response => {
      res.json(response.data.response.player_level);
    })
    .catch(error => {
      res.status(404).send('Not Found')
    });
})


//GameDetail
router.post('/getGameDetail', async (req, res) => {
  const appids = req.body.appids;
  let api = 'https://store.steampowered.com/api/appdetails?key=C29734B137600548FE00C77906A76EE5&cc=us&l=english&appids=' + appids;
  console.log(api);
  axios.get(api, {
    retry: 5,
    retryDelay: 1000,
    timeout: 6000
  })
    .then(response => {
      // console.log(response.data);
      res.json(response.data[appids].data);
    })
    .catch(error => {
      console.log(error);
      res.status(404).send('Not Found')
    });
})

export default router;