import React, { useRef, useState, useEffect } from 'react'
import { Typography, Divider, PageHeader, Row, Col, Card, Space, Avatar, Image, Progress, List, Button, Input, Spin } from 'antd';
import "../css/PersonalPage.css"
import axios from "axios";
import usePost from '../usePost';

const { Title, Paragraph, Text, Link } = Typography;
const { Search } = Input;


var currentUser = null;

async function getCurrentUser (id) {
  await axios.post('/api/steamApi/getUserInfo', { steamids: id })
    .then(response => {
      console.log("response.data");
      console.log(response.data.length);
      if (response.data.length === 0) {
        currentUser = {
          pname: "invalid id",
          avatarURL: "./Clefairy.png"
        }
        console.log(currentUser);
        return
      }
      const userData = response.data;
      const userArray = userData.map(user => (
        {
          pname: user.personaname,
          avatarURL: user.avatarfull,
        }));
      currentUser = userArray[0];
    })
    .catch(error => {
      console.log(error);
    })
};

export default function PersonalPage () {

  const inputEL = useRef(null);

  // 76561198399481384
  const [curID, setCurID] = useState("76561198302224528");
  const [isLoading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    async function fetchData () {
      setLoading(true);
      try {
        await getCurrentUser(curID);
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
    <>
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
                  console.log(inputEL.current.input.value);
                  // console.log(currentUser);
                  //getCurrentUser(inputEL.current.input.value)
                }}
              />
            </Col>
          </Row>
        </Col>

        <Col span={12} >
          <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <Card bordered={true} hoverable={true}>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  {isLoading ? <Spin size="large" /> : <Image src={currentUser.avatarURL} shape="square" />}
                  {/* <Image src={currentUser.avatarURL} shape="square" /> */}
                </Col>
                <Col span={8}>
                  <Space direction="vertical" style={{ width: '100%' }} size={16}>
                    <Text strong="true">{isLoading ? "Loading..." : currentUser.pname}</Text>
                    <Text>User Description</Text>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space direction="vertical" style={{ width: '100%' }} size={16}>
                    <Text strong="true">Level 10</Text>
                    <Avatar src={"https://joeschmoe.io/api/v1/random"} shape="square" />
                    {/* <img alt="徽章1" src="https://joeschmoe.io/api/v1/random" /> */}
                  </Space>
                </Col>

              </Row>


            </Card>

            <Card bordered={true} hoverable={true}>
              <Space direction="vertical" style={{ width: '100%' }} size={16}>
                <Card bordered={true} hoverable={false} size="small">
                  <Row justify="space-between">
                    <Text strong="true" >最近动态</Text>
                    <Text>过去2周共7.3小时</Text>
                  </Row>
                </Card>

                <Card bordered={true} hoverable={true} size="small">
                  <Space direction="vertical" style={{ width: '100%' }} size={10}>
                    <Row gutter={16}>
                      <Col span={7}>
                        <Image alt="1" src="https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg?t=1649897484" />
                      </Col>
                      <Col span={17}>
                        <Row justify="start" style={{ padding: '6px 0px 10px 0px' }}>
                          <Text strong="true">Elden Ring</Text>
                        </Row>
                        <Row justify="end">
                          <Text type="secondary">总游玩时长7.6小时</Text>
                        </Row>
                        <Row justify="end">
                          <Text type="secondary">最后游玩于4月12日</Text>
                        </Row>
                      </Col>
                    </Row>

                    <Card bordered={true} size="small">
                      <Row gutter={5}>
                        <Col span={5}>
                          <Text type="secondary">成就进度 15/20</Text>
                        </Col>
                        <Col span={5}>
                          <Progress percent={(15 / 20) * 100} showInfo={false} status="active"
                            strokeColor={'#881E9C'} />
                        </Col>
                        <Col span={5} offset={1}>
                          <Avatar src={"https://joeschmoe.io/api/v1/random"} shape="square" size={"small"} />
                        </Col>
                      </Row>
                    </Card>

                  </Space>
                </Card>

                <Card bordered={true} hoverable={true} size="small">
                  <Space direction="vertical" style={{ width: '100%' }} size={10}>
                    <Row gutter={16}>
                      <Col span={7}>
                        <Image alt="1" src="https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg?t=1649897484" />
                      </Col>
                      <Col span={17}>
                        <Row justify="start" style={{ padding: '6px 0px 10px 0px' }}>
                          <Text strong="true">CS:GO </Text>
                        </Row>
                        <Row justify="end">
                          <Text type="secondary">总游玩时长7.6小时</Text>
                        </Row>
                        <Row justify="end">
                          <Text type="secondary">最后游玩于4月12日</Text>
                        </Row>
                      </Col>
                    </Row>

                    <Card bordered={true} size="small">
                      <Row gutter={5}>
                        <Col span={4}>
                          <Text type="secondary">成就进度 13/33</Text>
                        </Col>
                        <Col span={5}>
                          <Progress percent={(13 / 33) * 100} showInfo={false} status="active"
                            strokeColor={'#881E9C'} />
                        </Col>
                        <Col span={5} offset={1}>
                          <Avatar src={"https://joeschmoe.io/api/v1/random"} shape="square" size={"small"} />
                        </Col>
                      </Row>
                    </Card>

                  </Space>
                </Card>

                <Card bordered={true} hoverable={true} size="small">
                  <Space direction="vertical" style={{ width: '100%' }} size={10}>
                    <Row gutter={16}>
                      <Col span={7}>
                        <Image alt="1" src="https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg?t=1649897484" />
                      </Col>
                      <Col span={17}>
                        <Row justify="start" style={{ padding: '6px 0px 10px 0px' }}>
                          <Text strong="true">DOTA2</Text>
                        </Row>
                        <Row justify="end">
                          <Text type="secondary">总游玩时长7.6小时</Text>
                        </Row>
                        <Row justify="end">
                          <Text type="secondary">最后游玩于4月12日</Text>
                        </Row>
                      </Col>
                    </Row>

                    <Card bordered={true} size="small">
                      <Row gutter={5}>
                        <Col span={4}>
                          <Text type="secondary">成就进度 11/55</Text>
                        </Col>
                        <Col span={5}>
                          <Progress percent={(11 / 55) * 100} showInfo={false} status="active"
                            strokeColor={'#881E9C'} />
                        </Col>
                        <Col span={5} offset={1}>
                          <Avatar src={"https://joeschmoe.io/api/v1/random"} shape="square" size={"small"} />
                        </Col>
                      </Row>
                    </Card>

                  </Space>
                </Card>

              </Space>
            </Card>
          </Space>
        </Col>

        {/* 右侧 */}
        <Col span={8} >
          <Card bordered={true} hoverable={true}>
            <Space direction="vertical" style={{ width: '100%' }} size={6}>
              <Title level={4}>正在线上</Title>

              <Card size={'small'} bordered={false} hoverable={false} >
                <Divider orientation="left" plain>
                  徽章 3
                </Divider>
                <Avatar src={"https://joeschmoe.io/api/v1/random"} shape="square" />
              </Card>

              <Card size={'small'} bordered={false} hoverable={false} >
                <Divider orientation="left" plain>
                  游戏 33
                </Divider>
                <Avatar src={"https://joeschmoe.io/api/v1/random"} shape="square" />
              </Card>

              <Card size={'small'} bordered={false} hoverable={false} >
                <Divider orientation="left" plain>
                  好友 66
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
              </Card>

            </Space>
          </Card>
        </Col>


      </Row >



      <Row gutter={[16, 16]} justify="center" style={{ padding: '36px 14px 14px' }} >
        <Paragraph>
          Data from <Text keyboard>Valve</Text>'s API: <Link href="https://ant.design/">https://ant.design/</Link>
        </Paragraph>
      </Row >
    </>
  )
}



const data = [
  {
    title: 'User 1',
  },
  {
    title: 'User 2',
  },
  {
    title: 'User 3',
  },
  {
    title: 'User 4',
  },
];