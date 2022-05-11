import React from 'react'
import { useState, useEffect, useContext } from 'react'
import usePost from '../usePost';
import { Typography, Divider, Space, Card, Row, Col, Image, Spin, Modal, Carousel, List, message, Avatar} from 'antd';
import RankList from './RankList';
import NewsCarousel from './NewsCarousel'
import axios from 'axios';
import { Outlet, Link, useLocation } from "react-router-dom"
import "../css/GlobalCSS.css"

const { Title } = Typography;
const {Meta} = Card;

const appIdList = [730, 570, 1599340, 578080, 1172470, 1245620, 271590, 1203220, 252490, 440, 431960, 1418630, 1623660, 1085660, 1794680];
const appName = ["Counter-Strike: Global Offensive", "Dota 2", "Lost Ark", "PUBG: BATTLEFROUDS", "Apex Legends", "ELDEN RING", "Grand Theft Auto V", "NARAKA:BLADPOINT", "Rust", "Team Fortress 2", "Wallpaper Engine", "Dread Hunger", "MIR 4", "Destiny 2", "Vampire Survivors"]
var currentPlayersNum = null;
var gameName = null;

function showhtml(htmlString){
  var html = {__html:htmlString};
  return <div dangerouslySetInnerHTML={html}></div>;
}

async function getcurrentUsers (index){
  await axios.post('/api/steamApi/getOnlinePlayer', {appid: appIdList[index] })
  .then(response => {
    currentPlayersNum = response.data;
    gameName = appName[index];
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  })
};

//This is the homepage, use <Typography> to typography the content.
export default function HomePage() {

  const [isLoading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  const a = Math.round(Math.random() * (14));

  function toWeb(url){
    window.location.href = url;
  }

  useEffect(() => {
    async function fetchData () {
      setLoading(true);
      try {
        await getcurrentUsers(a)
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }
    fetchData();
  }, [refresh]);

  return (
  
    <Typography style={{marginTop:"-70px"}}>
      {/* Background of Title */}
      <div style={{textAlign: 'center', backgroundImage:"url('./bg1.jpg')", marginTop:"-99px", marginLeft:"-24px", marginRight:"-24px", paddingTop:"3%", paddingBottom:"5%"}}>
        {/* Title */}
        <div style={{fontSize: '70px', fontWeight: '500', marginTop: '5%', color: '#ffffff'}}>
        Welcome to Game Box!</div>
          
        {/* 可能的在线人数 */}
        <div style={{fontSize: '30px', fontWeight: '500', marginTop: '1%', color: '#ffffff'}}><span style={{color: '#f6622a'}}>{currentPlayersNum}</span> users are playing {gameName}</div>
      </div>

      <Row style={{marginTop: '1%'}} gutter={32} align="top">
        {/* News */}
        <Col span={11} offset={3}>
          <div style={{fontSize: '30px', fontWeight: '400', marginBottom: "1%"}}><a href='/NewsPage' className='my-link'>News</a></div>
          <NewsCarousel></NewsCarousel>
        </Col>

        {/* Rank */}
        <Col span={7}>
          <div style={{fontSize: '30px', fontWeight: '400', marginBottom: "1%"}}><a href='/RankPage' className='my-link'>Everyone is playing</a></div>
          <RankList></RankList>
        
        </Col>
      </Row>

      <Row justify='center' style={{marginTop: "5%"}} gutter={32} >
        <Col span={6}>
          <Card
            hoverable
            style={{border: '1px solid #d9d9d9'}}
            cover={<img alt="example" src="./BGNews.png" onClick={()=>{toWeb("/NewsPage")}}/>}
          >
            <Meta title="News" />
          </Card>
        </Col>

        <Col span={6}>
          <Card
            hoverable
            style={{border: '1px solid #d9d9d9'}}
            cover={<img alt="example" src="./BGPerson.png" onClick={()=>{toWeb("/PersonalPage/76561198302224528")}}/>}
          >
            <Meta title="Personal" />
          </Card>
        </Col>
        
        <Col span={6}>
          <Card
            hoverable
            style={{border: '1px solid #d9d9d9'}}
            cover={<img alt="example" src="./BGPopular.png" onClick={()=>{toWeb("/RankPage")}}/>}
          >
            <Meta title="Popular" />
          </Card>
        </Col>

      </Row>


      
                
    </Typography>
  )
}

