import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Typography, Divider, Space, Card, Row, Col, Image, Spin, Modal, Carousel, List, message, Avatar} from 'antd';
import axios from 'axios';
const {Meta} = Card;
const appIdList = [730, 570, 578080, 1245620, 271590, 1203220];
const appName = ["Counter-Strike: Global Offensive", "Dota 2", "PUBG: BATTLEFROUDS", "ELDEN RING", "Grand Theft Auto V", "NARAKA:BLADPOINT"]
const randomChooseNumber = 4
const count = 1
const feedString = "PCGamesN"
var listData = []

function getRandomIndex(){
  var indexList = []
  for(let i = 0; i < appIdList.length; i++) {
    indexList.push(i)
  }
  indexList.sort(function(){ return 0.5 - Math.random(); })
  return indexList.slice(0, randomChooseNumber)
}

const indexList = getRandomIndex()

var randomAppIdList = []
var randomAppNameList = []
for(let i = 0; i < indexList.length; i++) {
  randomAppIdList.push(appIdList[indexList[i]])
  randomAppNameList.push(appName[indexList[i]])
}

function getImg(text){
  let reg = /<img.*?src=[\"|\'](.*?)[\"|\'].*?>/
  reg.exec(text);

  if (reg.test(text)) {
    return RegExp.$1
  } else {
    return ""
  }
}

async function getNews (i){
  await axios.post('/api/steamApi/getNews', {appid: randomAppIdList[i], count:count, feeds: feedString })
  .then(response => {
    console.log(response.data);
    const manyNews = response.data.map(news => ({id: news.gid, title: news.title, url:news.url, author:news.author, content:news.contents, date:news.date}));
    manyNews.forEach(oneNews => {
      oneNews.appName = randomAppNameList[i]
      oneNews.img = getImg(oneNews.content)
      listData.push(oneNews)
    });
  })
  .catch(error => {
    console.log(error);
  })
};

export default function NewsCarousel () {
  
  const[isLoading, setLoading] = useState();

  useEffect(() => {
    async function fetchData(){
      setLoading(true);
      try{
        for(let i = 0; i < randomChooseNumber; i++){
          await getNews(i);
        }
        setLoading(false);
        console.log("listData");
        console.log(listData);
      } catch{
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  
  return (
    <div>
      {isLoading ? <ShowLoading /> : <ShowNewsCarousel />}
    </div>
  )
  
}

const imgStyle = {
  height: '340px',
  objectFit: 'cover',
  overflow: 'hidden'
}

function ShowNewsCarousel(){
  return (
    <Carousel autoplay dotPosition='left' style={{border: '1px solid #d9d9d9'}}>
      {
        listData.map((news, index) => (
          <div>
            <Card bordered = "false"
              hoverable = "true"
              cover={<img alt="index" src={news.img} style={imgStyle}/>}
            >
              <Meta title={news.title} description={news.appName} />
            </Card>
          </div>
          
          // <div>
          //   {
          //     news.img != "" ? <img alt={index} style={imgStyle} src={news.img} /> 
          //     : <img alt={index} style={imgStyle} src="./noimg.svg" />
          //   }
          // </div>
        ))
      }
  </Carousel>
  )
}

function ShowLoading(){
  return (
    <div style = {{textAlign: 'center'}}>
      <Space size = "large">
        <Spin tip="Loading..." size = "large"/>
      </Space>
    </div>
  )
}