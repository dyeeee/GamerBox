import React, { useRef, useState, useEffect } from 'react'
import { Typography, Divider, PageHeader, Row, Col, Card, Space, Avatar, Image, Badge, List, Button, Input, Spin, Pagination } from 'antd';
import "../css/PersonalPage.css"
import axios from "axios";
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import FriendList from './Friend';
export const AuthContext = React.createContext({});



const { Title, Paragraph, Text, Link } = Typography;
const { Search } = Input;


var currentUser = null;
var gameArray = [];
var game_count = 0;
var level = 0;
const personalState = ["Offline", "Online", "Busy", "Away", "Snooze", "looking to trade", "looking to play"]

async function getCurrentUser (id) {
  await axios.post('/api/steamApi/getUserInfo', { steamids: id })
    .then(response => {
      // console.log("response.data");
      // console.log(response.data.length);
      if (response.data.length === 0) {
        currentUser = {
          pname: "invalid id",
          avatarURL: "../../Clefairy.png",

        }
        // console.log(currentUser);
        return
      }
      const userData = response.data;

      const userArray = userData.map(user => (
        {
          pname: user.personaname,
          avatarURL: user.avatarfull,
          personastate: user.personastate,
          lastlogoff: user.lastlogoff,
          timecreated: user.timecreated
        }));
      currentUser = userArray[0];
    })
    .catch(error => {
      // console.log(error);
    })
};


async function getUserLevel (uid) {
  await axios.post('/api/steamApi/getUserLevel', { steamids: uid })
    .then(response => {
      level = response.data;
    })
    .catch(error => {
      level = 0;
      return
    })
}

async function getGamesLibrary (uid) {
  await axios.post('/api/steamApi/getGamesLibrary', { steamids: uid })
    .then(response => {
      game_count = response.data.game_count;
      const gameData = response.data.games;
      gameArray = gameData.map(game => (
        {
          appid: game.appid,
          name: game.name,
          playtime: game.playtime_forever / 60,
          img_icon: 'http://media.steampowered.com/steamcommunity/public/images/apps/' + game.appid + '/' + game.img_icon_url + '.jpg',
          img_logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + game.appid + '/header.jpg?t=1649897484',
          playtimeRecently: !isNaN(game.playtime_2weeks) ? game.playtime_2weeks / 60 : 0,
        }));
    })
    .catch(error => {
      game_count = 0;
      gameArray = [{
        appid: 1,
        name: 2,
        playtime: 60 / 60,
        img_icon: 'http://media.steampowered.com/steamcommunity/public/images/apps/' + 550 + '/' + '7d5a243f9500d2f8467312822f8af2a2928777ed' + '.jpg',
        img_logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + 550 + '/header.jpg?t=1649897484',
        playtimeRecently: 0,
      },
      ]
    })
};


export default function PersonalPage () {
  const params = useParams();
  const inputEL = useRef(null);

  // 76561198399481384
  const [curID, setCurID] = useState(params.uid);
  const [isLoading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    async function fetchData () {
      setLoading(true);
      try {
        await getCurrentUser(curID);
        await getUserLevel(curID);
        await getGamesLibrary(curID);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }
    fetchData();
  }, [refresh]);

  // console.log(currentUser);
  // console.log(isLoading);

  return (
    <div style={{ background: `url('../../bg1.jpg')` }}>
      <PageHeader
        className="site-page-header"
        title="Personal Page"
        subTitle={"ID:" + curID}
      />


      <Row gutter={[16, 16]} justify="center">
        <Col span={20} >
          <Row gutter={[16, 16]} justify="start">
            <Col span={12}>
              <Search
                addonBefore="Steamid"
                placeholder="input your steamid"
                allowClear
                enterButton="Refresh"
                ref={inputEL}
                onSearch={() => {
                  setRefresh(!refresh);
                  setCurID(inputEL.current.input.value);
                  // history('/PersonalPage/'+curID+'/1',{replace:false});
                  // console.log(inputEL.current.input.value);
                  // console.log(currentUser);
                  //getCurrentUser(inputEL.current.input.value)
                }}
                style={{ background: 'rgba(255, 255, 255, .3)', backdropFilter: 'blur(10px)' }}
              />
            </Col>
          </Row>
        </Col>

        <Col span={12} >
          <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <Card bordered={false} hoverable={false} style={{ background: 'rgba(255, 255, 255, .3)', backdropFilter: 'blur(10px)' }}>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  {isLoading ? <Spin size="large" /> : <Image src={currentUser.avatarURL} shape="square" />}
                  {/* <Image src={currentUser.avatarURL} shape="square" /> */}
                </Col>
                <Col span={8}>
                  <Space direction="vertical" style={{ width: '100%' }} size={16}>
                    <Text strong="true">{isLoading ? "Loading..." : currentUser.pname}</Text>
                    <Space direction="vertical" style={{ width: '100%' }} size={0}>
                      <Text>Last log off</Text>
                      <Text strong="true">{isLoading ? "Loading..." : getDate(currentUser.lastlogoff)}</Text>

                    </Space>

                  </Space>
                </Col>
                <Col span={8}>
                  <Space direction="vertical" style={{ width: '100%' }} size={16}>
                    <Space>
                      <Text strong="true">Level</Text>
                      <Badge
                        count={level}
                        style={{ backgroundColor: '#52c41a' }}
                      />
                    </Space>

                    <Space direction="vertical" style={{ width: '100%' }} size={0}>
                      <Text>Created since</Text>
                      <Text strong="true">{isLoading ? "Loading..." : getDate(currentUser.timecreated)}</Text>

                    </Space>

                  </Space>
                </Col>

              </Row>


            </Card>
            <AuthContext.Provider value={curID}>
              <Outlet />
            </AuthContext.Provider>

          </Space>

        </Col>

        {/* right side */}
        <Col span={8} >
          <Card bordered={false} hoverable={true} style={{ background: 'rgba(255, 255, 255, .3)', backdropFilter: 'blur(10px)' }}>
            <Space direction="vertical" style={{ width: '100%' }} size={6}>
              <Title level={4} style={{ color: '#4CF066' }}>{isLoading ? "Loading..." : personalState[currentUser.personastate]}</Title>

              <Card size={'small'} bordered={false} hoverable={false} style={{ background: 'rgba(255, 255, 255, .1)', backdropFilter: 'blur(10px)' }}>
                <Divider orientation="left" plain>
                  All Games {game_count}
                </Divider>
                {gameArray.map(os => (
                  <Avatar src={os.img_icon} shape="square" />
                ))}
              </Card>

              {/* <Card size={'small'} bordered={false} hoverable={false} style={{ background: 'rgba(255, 255, 255, .1)', backdropFilter: 'blur(10px)' }}>
                <Divider orientation="left" plain>
                  Friends 66
                </Divider>
                <List
                  size="small"
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="最近一次游玩13小时前"
                      />
                    </List.Item>
                  )}
                />
              </Card> */}


              <AuthContext.Provider value={curID}>
                <FriendList />
              </AuthContext.Provider>

            </Space>
          </Card>
        </Col>


      </Row >



      <Row gutter={[16, 16]} justify="center" style={{ padding: '36px 14px 14px' }} >
        <Paragraph>
          Data from <Text keyboard>Valve</Text>'s API: <Link href="https://ant.design/">https://ant.design/</Link>
        </Paragraph>
      </Row >
    </div>
  )
}


function getDate (unix) {
  //创建一个指定的日期对象
  var temp_time = new Date(unix * 1000);
  //取得4位数的年份
  var year = temp_time.getFullYear();
  //取得日期中的月份，其中0表示1月，11表示12月
  var month = temp_time.getMonth() + 1;
  //小于10月的月份补全0 例如1月补全为01月
  month = month < 10 ? "0" + month : month;
  //返回日期月份中的天数（1到31）
  var day = temp_time.getDate();
  day = day < 10 ? "0" + day : day;
  //返回日期中的小时数（0到23）
  var hour = temp_time.getHours();
  hour = hour < 10 ? "0" + hour : hour;
  //返回日期中的分钟数（0到59）
  var minute = temp_time.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;

  //拼接需要的时间格式
  var result_time = year + "-" + month + "-" + day
  return result_time
}