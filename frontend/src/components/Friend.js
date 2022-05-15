import { AuthContext } from './PersonalPage';
import React, { useState, useEffect, useContext } from 'react'
import { Typography, Card, Space, Avatar, List, Divider, Spin } from 'antd';
import axios from "axios";
const { Text } = Typography;

var UserArray = [];
var friendsL = [];
var NumberFriendList = 0;

async function getCurrentUser (id, friendsL) {
  if(friendsL.length >=6){
    NumberFriendList = 6;
  }else{
    NumberFriendList = friendsL.length;
  }
  for (let i = 0; i < NumberFriendList; i++) {
    await axios.post('/api/steamApi/getUserInfo', { steamids: friendsL[i].steamid })
      .then(response => {
        const userData = response.data;
        UserArray.push({
          steamid: friendsL[i].steamid,
          pname: userData[0].personaname,
          avatar: userData[0].avatar,
          friend_since: friendsL[i].friend_since
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

};

async function getFriendList (uid) {
  await axios.post('/api/steamApi/getFriendList', { steamids: uid })
    .then(response => {
      const friendList = response.data;
      friendsL = friendList.map(os => (
        {
          steamid: os.steamid,
          friend_since: os.friend_since
        }
      ))
    })
    .catch(error => {
      console.log(error);
    })
}



export default function Friend () {
  const curID = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    async function fetchData () {
      setLoading(true);
      try {
        await getFriendList(curID);
        await getCurrentUser(curID, friendsL);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }
    fetchData();
  }, [refresh, curID]);

  const NoA = () => (
    <Card size={'small'} bordered={false} hoverable={false} style={{ background: 'rgba(255, 255, 255, .1)', backdropFilter: 'blur(10px)' }}>
      <Text>This user hide his/her friendList</Text>
    </Card>
  )


  const ShowFriendList = () => (
    <Card size={'small'} bordered={false} hoverable={false} style={{ background: 'rgba(255, 255, 255, .1)', backdropFilter: 'blur(10px)' }}>
      <Divider orientation="left" plain>
        Friends {UserArray.length}
      </Divider>

      {friendsL.length===0 ? <NoA/> : 
      <List
        size="small"
        itemLayout="horizontal"
        dataSource={UserArray.slice(0, 7)}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={"/PersonalPage/"+item.steamid+"/1"} target = "_blank" rel='noreferrer'>{item.pname}</a>}
              description={"Since: " + getDate(item.friend_since)}
            />
          </List.Item>
        )}
      />}

    </Card>
  )

  return (
    <div>
      {isLoading ? <ShowLoding /> : <ShowFriendList />}
    </div>
  )
}

function ShowLoding () {
  return (
    <div style={{ textAlign: 'center' }}>
      <Space size="large">
        <Spin tip="Loading..." size="large" />
      </Space>
    </div>

  )
}

// from UNIX to normal Date
function getDate (unix) {
  var temp_time = new Date(unix * 1000);
  var year = temp_time.getFullYear();
  var month = temp_time.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  var day = temp_time.getDate();
  day = day < 10 ? "0" + day : day;
  var hour = temp_time.getHours();
  hour = hour < 10 ? "0" + hour : hour;
  var minute = temp_time.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;

  var result_time = year + "-" + month + "-" + day + " " + hour + ":" + minute
  return result_time
}

