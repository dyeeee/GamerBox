import React, {  useState, useEffect,useContext } from 'react'
import { Typography,  Row, Col, Card, Space, Avatar, Image, Progress,Pagination,Spin } from 'antd';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { AuthContext } from './PersonalPage';
import {SmallDashOutlined} from '@ant-design/icons'
const { Text } = Typography;


var gameArray = [];
var count = 0;
var currentPageData = [];
//当前页的十个游戏的游戏成就
//name      defaultvalue  displayName  hidden      description  icon  icongray
var gameAchievements = [];
var CurrentNumberOfPage = 5;
var NumberOfAchievemnts = [];

async function getGamesLibrary(uid){
    await axios.post('/api/steamApi/getGamesLibrary', { steamids: uid })
      .then(response => {
        const gameData = response.data.games;
        count = response.data.game_count;
        gameArray = gameData.map(game => (
          {
            appid: game.appid,
            name: game.name,
            playtime: game.playtime_forever/60,
            img_icon: 'http://media.steampowered.com/steamcommunity/public/images/apps/'+game.appid+'/'+game.img_icon_url+'.jpg',
            img_logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + game.appid + '/header.jpg?t=1649897484',
            playtimeRecently: !isNaN(game.playtime_2weeks) ? game.playtime_2weeks/60 : 0,
          }));
      })
      .catch(error => {
        gameArray = [{
          appid: 730,
          name: 2,
          playtime: 60/60,
          img_icon: 'http://media.steampowered.com/steamcommunity/public/images/apps/'+550+'/'+'7d5a243f9500d2f8467312822f8af2a2928777ed'+'.jpg',
          img_logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + 550 + '/header.jpg?t=1649897484',
          playtimeRecently: 0,
        }, 
      ]
      })
  };

//slice(0,5) 切割array的函数，包括开头，不包括结尾 0,5 就是0-4
async function paging(gameArray, currentPage){
    const start = currentPage-CurrentNumberOfPage;
    return gameArray.slice(start,currentPage);
}

async function getCurrentPageAchievement(currentPageData, uid){
  for(let i=0;i<currentPageData.length; i++){
    await axios.post('/api/steamApi/getAchievementsDetail', {appid: currentPageData[i].appid})
    .then(response =>{
      gameAchievements.push(response.data);
    })
    .catch(error =>{
      console.log(error);
    })
    //找出用户达成的成就数目
    await axios.post('/api/steamApi/getAchievements', {appid: currentPageData[i].appid, steamids: uid})
    .then(response =>{
      console.log(NumberOfAchievemnts)
      //找出achieved为1的数量
      let temp = 0;
      response.data.map(x =>{
        if(x.achieved === 1){
          temp++;
        }
      })
      NumberOfAchievemnts.push(temp);
    })
    .catch(error =>{
      console.log(error);
    })
  }
}

export default function GameLibrary() {
    const curID = useContext(AuthContext);
    const currentPage = useParams();
    const [isLoading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(true);
  

    useEffect(() => {
      async function fetchData () {
        setLoading(true);
        try {
          await getGamesLibrary(curID);
          currentPageData = await paging(gameArray,currentPage.id*CurrentNumberOfPage);
          await getCurrentPageAchievement(currentPageData,curID);
          setLoading(false);
        } catch {
          setLoading(false);
        }
      }
      fetchData();
    }, [refresh,curID]);
  
    // console.log(currentUser);
    // console.log(isLoading);
  
    let playtime_2w = 0;
    //计算最近两周用户游玩总时间
    gameArray.forEach(game =>{
      playtime_2w += game.playtimeRecently;
    })

    const ShowGameLibrary = () => (
      <Card bordered={false} hoverable={true} style={{ background: 'rgba(255, 255, 255, .3)', backdropFilter: 'blur(10px)' }}>
                <Space direction="vertical" style={{ width: '100%' }} size={16}>
                  <Card bordered={false} hoverable={false} size="small" style={{ background: 'rgba(255, 255, 255, .1)', backdropFilter: 'blur(10px)' }}>
                    <Row justify="space-between">
                      <Text strong="true" >最近动态</Text>
                      <Text>过去2周共{Math.round(playtime_2w*10)/10}小时</Text>
                    </Row>
                  </Card>
  
                  {currentPageData.map((os, index) => (
  
                    <Card bordered={false} hoverable={true} size="small" style={{ background: 'rgba(255, 255, 255, .1)', backdropFilter: 'blur(10px)' }} key={index}>
                    <Space direction="vertical" style={{ width: '100%' }} size={10}>
                      <Row gutter={16}>
                        <Col span={7}>
                          <Image alt="1" src={os.img_logo} />
                        </Col>
                        <Col span={17}>
                          <Row justify="start" style={{ padding: '6px 0px 10px 0px' }}>
                            <Text strong="true"><a href={"/GameDetailPage/"+os.appid} target = "_blank" rel='noreferrer' style={{color: "black"}}>{os.name}</a></Text>
                          </Row>
                          <Row justify="end">
                            <Text type="secondary">总游玩时长{Math.round(os.playtime*10)/10}小时</Text>
                          </Row>
                          <Row justify="end">
                            <Text type="secondary">过去两周游玩{Math.round(os.playtimeRecently*10)/10}小时</Text>
                          </Row>
                        </Col>
                      </Row>
  
                      <Card bordered={false} size="small" style={{ background: 'rgba(255, 255, 255, .1)', backdropFilter: 'blur(10px)' }}>
                        <Row gutter={5}>
                          <Col span={5}>
                            <Text type="secondary">成就进度 {NumberOfAchievemnts[index]}/{gameAchievements[index].length == null ? 0 : gameAchievements[index].length}</Text>
                          </Col>
                          <Col span={5}>
                            <Progress percent={((NumberOfAchievemnts[index]) / (gameAchievements[index].length == null ? 0 : gameAchievements[index].length)) * 100} showInfo={false} status="active"
                              strokeColor={'#881E9C'} />
                          </Col>
                          <Col span={10} offset={1}>
                            <Space>
                            {
                              gameAchievements[index].length == null ? 
                              <></> : 
                              gameAchievements[index].map((s,index) => (
                                
                                index > 4 ? <></> :  <Avatar src={s.icon} shape="square" size={"small"}/>
                              ))
                            }
  
                            {
                              gameAchievements[index].length > 4 ? 
                              <SmallDashOutlined /> : <></>
                            }
                            </Space>
  
                          </Col>
                        </Row>
                      </Card>
  
                    </Space>
                  </Card>
                  ))}
  
                  <Pagination defaultCurrent={currentPage.id} total={count} defaultPageSize={CurrentNumberOfPage} showSizeChanger={false} onChange={page => {
                      window.location.href = '/PersonalPage/'+curID+'/'+page;
                  }} />
                </Space>
                
              </Card>
    )

  
  return (
    <div>
      {isLoading ? <ShowLoding /> : <ShowGameLibrary />}
    </div>
  )
}

function ShowLoding(){
  return (
    <div style = {{textAlign: 'center'}}>
      <Space size = "large">
        <Spin tip="Loading..." size = "large"/>
      </Space>
    </div>

  )
}

