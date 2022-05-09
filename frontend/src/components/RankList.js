import React, { useState, useEffect } from 'react';
import { List, message, Avatar, Typography, Spin, Space, Image, Divider } from 'antd';
import { Column } from '@ant-design/plots';
import axios from 'axios';
import VirtualList from 'rc-virtual-list';

const { Title} = Typography;
const ContainerHeight = 200;

const appIdList = [730, 570, 1599340, 578080, 1172470]
const appName = ["Counter-Strike: Global Offensive", "Dota 2", "Lost Ark", "PUBG: BATTLEFROUDS", "Apex Legends"]

var listData = []

async function getCurrentUsers (i){
  await axios.post('/api/steamApi/getOnlinePlayer', {appid: appIdList[i] })
  .then(response => {
    console.log(response.data);
    listData.push({
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
        for(let i = 0; i < 5; i++){
          await getCurrentUsers(i);
        }
        setLoading(false);
      } catch{
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  
  sortList();

  //console.log(listData);
  //window.location.reload(false);
  return (
    <div>
      {isLoading ? <ShowLoading /> : <ShowGameRank />}
    </div>
  )
  
}

function ShowGameRank(){
  // return (
  //   <Typography>
  //     <List
        
  //       itemLayout="horizontal"
  //       bordered = "true"
  //       dataSource={listData}
  //       renderItem={item => (
          
  //         <List.Item>
  //           <List.Item.Meta
  //            avater = {<Image src="https://joeschmoe.io/api/v1/random" />}
  //            title= {<a href={"/GameDetailPage/"+item.appid} target = "_blank" rel='noreferrer'>{item.name}</a>}
  //            description = {item.currentUser}
  //           />
  //         </List.Item>
          
  //       )}
  //     />
  //   </Typography>
  // )
  return (
    <List>
      <VirtualList
        data={listData}
        height={ContainerHeight}
        itemHeight={10}
        itemKey="name"
        //onScroll={onScroll}
      >
        {item => (
          <List.Item key={item.name}>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={"/GameDetailPage/"+item.appid} target = "_blank" rel='noreferrer'><font size="3">{item.name}</font></a>}
              description={<font size="3">{item.currentUser}</font>}
            />
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
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

function sortList(){
  console.log(listData);
  listData.sort(function(a, b){return b.currentUser - a.currentUser});
}