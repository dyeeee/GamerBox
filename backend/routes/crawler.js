import express from "express"
import request from 'request'
import cheerio from 'cheerio'

const router = express.Router();

router.get('/', async (req, res) => {
    request('https://www.cnblogs.com/', function(error, response, body){
        if(!error && response.statusCode == 200){
            //返回的body为抓到的网页的html内容
            var $ = cheerio.load(body);      //$相当于拿到了所有的body里面的选择器
            var tbody = $('ul').html();
            res.send(tbody);
        }else{
            res.send("error");
        }
    })
});


export default router;