import React from 'react'
import { useState, useEffect, useContext } from 'react'
import usePost from '../usePost';
import { Typography, Divider, Space, Card, Row, Col, Image, Spin, Modal, Carousel, List, message, Avatar} from 'antd';
import RankList from './RankList';
import axios from 'axios';

const { Title } = Typography;
const {Meta} = Card;

const appIdList = [730, 570, 1599340, 578080, 1172470, 1245620, 271590, 1203220, 252490, 440, 431960, 1418630, 1623660, 1085660, 1794680];
const appName = ["Counter-Strike: Global Offensive", "Dota 2", "Lost Ark", "PUBG: BATTLEFROUDS", "Apex Legends", "ELDEN RING", "Grand Theft Auto V", "NARAKA:BLADPOINT", "Rust", "Team Fortress 2", "Wallpaper Engine", "Dread Hunger", "MIR 4", "Destiny 2", "Vampire Survivors"]
var CurrentPlayersNum = null;
var GameName = null;


function showhtml(htmlString){
  var html = {__html:htmlString};
  return <div dangerouslySetInnerHTML={html}></div>;
}

async function getCurrentUsers (index){
  await axios.post('/api/steamApi/getOnlinePlayer', {appid: appIdList[index] })
  .then(response => {
    CurrentPlayersNum = response.data;
    GameName = appName[index];
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  })
};

//This is the homepage, use <Typography> to typography the content.
export default function HomePage() {
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  const [isLoading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  const a = Math.round(Math.random() * (14));

  useEffect(() => {
    async function fetchData () {
      setLoading(true);
      try {
        await getCurrentUsers(a)
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }
    fetchData();
  }, [refresh]);

  return (
  
    <Typography>
      {/* Background of Title */}
      <div style={{textAlign: 'center'}}>
        {/* Title */}
        <div style={{fontSize: '70px', fontWeight: '500', marginTop: '5%'}}>
          Hello! This is title</div>
          
        {/* 可能的在线人数 */}
        <div style={{fontSize: '30px', fontWeight: '500', marginTop: '1%'}}><span style={{color: '#f6622a'}}>{CurrentPlayersNum}</span> users are playing {GameName}</div>
      </div>

      <Row style={{marginTop: '5%'}} gutter={32} align="top">
        {/* News */}
        <Col span={11} offset={3}>
          <div style={{fontSize: '30px', fontWeight: '400', marginBottom: "1%"}}>News</div>
          <Carousel autoplay>
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
        </Col>

        {/* Rank */}
        <Col span={7}>
          <div style={{fontSize: '30px', fontWeight: '400', marginBottom: "1%"}}>Everyone is playing</div>
          <RankList></RankList>
        
        </Col>
      </Row>

      <Row justify='center' style={{marginTop: "5%"}} gutter={32} >
        <Col span={6}>
          <Card
            hoverable
            style={{}}
            cover={<img alt="example" src="./noimg.svg" />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>

        <Col span={6}>
          <Card
            hoverable
            style={{}}
            cover={<img alt="example" src="./noimg.svg" />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        
        <Col span={6}>
          <Card
            hoverable
            style={{}}
            cover={<img alt="example" src="./noimg.svg" />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>

      </Row>


      
                
    </Typography>
  )
}

  // const cart = {
  //   appid:'730',
  //   count:'3'
  // }

  // const {data: newsData, error : isError} = usePost('/api/steamApi/getNews', [], cart);
  // console.log(isError);
  // if(isError){
  //   return(
  //     <div>
  //       error
  //     </div>
  //   )
  // }

  // const newsSummaries = newsData.map(news => ({id: news.gid, title: news.title, url:news.url, author:news.author, content:news.contents}));

  // return (
  //   <div>
  //     {newsSummaries.map(os => (
  //         <div key={os.id}>
  //           <p>{os.id}</p>
  //           {showhtml(os.content)}
  //         </div>
  //     ))}
  //     </div>
  // )


