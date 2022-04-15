import React from 'react'
import { Typography, List, Avatar, Space } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const appIdList = [730, 570, 1599340, 578080, 1172470, 1245620, 271590, 1203220, 252490, 440, 431960, 1623660, 1418630, 1794680, 1085660];
const appName = ["Counter-Strike: Global Offensive", "Dota 2", "Lost Ark", "PUBG: BATTLEFROUDS", "Apex Legends", "ELDEN RING", "Grand Theft Auto V", "NARAKA:BLADPOINT", "Rust", "Team Fortress 2"]

const listData = [];
for(let i = 0; i < 10; i++){
  listData.push({
    index: i+1,
    appid: appIdList[i],
    avatar: 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + appIdList[i] + '/header.jpg?t=1649897484',
    name: appName[i],
    currentUser: 1000
  });
}

const columns = [
  {
    title: 'Game Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Players Now',
    dataIntex: 'players',
    key: 'players',
  },
  {
    title: '',
    dataIndex: 'img',
    key: 'img',
  },
];

//This is the homepage, use <Typography> to typography the content.
export default function RankPage () {
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
