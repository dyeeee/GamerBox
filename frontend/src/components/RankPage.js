import {React, useEffect, useState} from 'react'
import { Typography, List, Spin, Space } from 'antd';
import axios from 'axios';


const { Title, Paragraph, Text, Link } = Typography;

const appIdList = [730, 570, 1599340, 578080, 1172470, 1245620, 271590, 1203220, 252490, 440];
const appName = ["Counter-Strike: Global Offensive", "Dota 2", "Lost Ark", "PUBG: BATTLEFROUDS", "Apex Legends", "ELDEN RING", "Grand Theft Auto V", "NARAKA:BLADPOINT", "Rust", "Team Fortress 2"]

var listData = []

async function getCurrentUsers (i){
  await axios.post('/api/steamApi/getOnlinePlayer', {appid: appIdList[i] })
  .then(response => {
    console.log(response.data);
    listData.push({
      index: i+1,
      appid: appIdList[i],
      avatar: 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + appIdList[i] + '/header.jpg?t=1649897484',
      name: appName[i],
      currentUser: response.data
    });
  })
  .catch(error => {
    console.log(error);
  })
};

//This is the homepage, use <Typography> to typography the content.
export default function RankPage () {
  //listData.length = 0;
  // for(let i = 0; i < 10; i++){
  //   getCurrentUsers(i);
  // }
  const[isLoading, setLoading] = useState();

  useEffect(() => {
    async function fetchData(){
      setLoading(true);
      try{
        listData.length = 0;
        for(let i = 0; i < 10; i++){
          await getCurrentUsers(i);
        }
        setLoading(false);
      } catch{
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  
  console.log(listData);
  //window.location.reload(false);
  return (
    <div>
      {isLoading ? <ShowLoding /> : <ShowGameRank />}
    </div>
  )
  
}

function ShowGameRank(){
  return (
    <Typography>
      <Title>RankPage</Title>

      <List
        //itemLayout="vertical"
        size="small"
        bordered = "true"
        dataSource={listData}
        renderItem={item => (
          <a href={item.avatar}>
          <List.Item
            extra={
              <img
                width={200}
                alt="logo"
                src={item.avatar}
              />
            }
          >
          <List.Item
            extra={
              <font size = "5">{'#'+item.index}</font>
            }
          ></List.Item>
            {/* <List.Item.Meta
              title= {<font size="5">{'#' + item.index}</font>}
            /> */}
            <List.Item.Meta
              title= {<font size="4">{item.name}</font>}
            />
            <List.Item.Meta
              title = {<font size="4">{"Current user: "+item.currentUser}</font>}
            />
          </List.Item>
          </a>
        )}
      />
    </Typography>
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

