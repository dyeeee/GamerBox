import React, { useRef, useState, useEffect } from 'react'
import { Typography, Divider, PageHeader, Row, Col, Card, Space, Avatar, Image, Tag, Carousel, Progress, List, Button, Input, Spin, Pagination } from 'antd';
import { Liquid } from '@ant-design/charts';
import { Line, DualAxes } from '@ant-design/plots';
import "../css/GlobalCSS.css"
import useGet from "../useGet";
import axios from "axios";

export const AuthContext = React.createContext({});


const { Title, Paragraph, Text, Link } = Typography;
const { Search } = Input;


const imgStyle = {
  height: '100%',
  objectFit: 'cover',
  width: '100%'
}

var gameData = null;

async function getGame (uid) {
  await axios.post('/api/steamApi/getGameDetail', { appids: uid })
    .then(response => {
      gameData = response.data;
      console.log(gameData.steam_appid)
    })
    .catch(
      console.log("error")
    )
};

const curID = 1085660

export default function GameDetailPage1 () {
  const { data: testdata } = useGet('/api/fetchData/' + curID, []);
  console.log(testdata.length === 0)
  const config = {
    data: [testdata, testdata],
    padding: 'auto',
    xField: 'DateTime',
    yField: ['Players', 'PlayersTrend'],
  };

  const [isLoading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    async function fetchData () {
      setLoading(true);
      try {
        await getGame(curID);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }
    fetchData();
  }, [refresh]);

  return (
    <div style={{ background: `url('../../bg1.jpg')` }}>
      <PageHeader
        className="site-page-header"
        title="Game Detail Page"
        subTitle={isLoading ? "Loading..." : "ID:" + gameData.steam_appid}
      />


      <Row gutter={[16, 16]} justify="center">

        <Col span={22} >
          {isLoading ? <Spin /> :
            <Space direction="vertical" style={{ width: '100%' }}>
              <Card bordered={false} hoverable={false} style={{ background: 'rgba(255, 255, 255, .3)', backdropFilter: 'blur(10px)' }}>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Space direction="vertical" style={{ width: '100%' }} >
                      <Image src={gameData.header_image} />

                      <Text strong={true}>{gameData.name}</Text>
                      <Text strong={true}>Release Date: {gameData.release_date.date}</Text>
                      <Text strong={true}>Publisher: {gameData.publishers[0]}</Text>
                      <Text strong={true}>Developer: {gameData.developers[0]}</Text>

                    </Space>
                  </Col>

                  <Col span={16} >

                    <Carousel dotPosition={'right'} autoplay>
                      {
                        gameData.screenshots.map((obj, index) => (
                          index > 4 ? <></> :
                            <div>
                              <img alt={index} style={imgStyle} src={obj.path_thumbnail} />
                            </div>
                        ))
                      }
                    </Carousel>


                  </Col>
                </Row>


              </Card>

            </Space>
          }
        </Col>




        <Col span={22} >
          {isLoading ? <Spin /> :
            <Card size={'small'} bordered={false} hoverable={false} style={{ background: 'rgba(255, 255, 255, .3)', backdropFilter: 'blur(10px)' }}>
              <Space direction="vertical" style={{ width: '100%' }} size={10}>

                <Col span={24}>
                  <Divider orientation="left">
                    Genres
                  </Divider>


                  {
                    gameData.genres.map((obj, index) => (

                      <Tag color="magenta">{obj.description}</Tag>

                    ))
                  }

                  {/* <Tag color="magenta">冒险</Tag>
                  <Tag color="red">独立</Tag>
                  <Tag color="volcano">角色扮演</Tag>
                  <Tag color="orange">策略</Tag> */}
                </Col>



                <Col span={24}>
                  <Divider orientation="left">
                    Description
                  </Divider>
                  <Text>{gameData.short_description}</Text>
                </Col>

              </Space>
            </Card>}
        </Col>


        {testdata.length !== 0 ? <Col span={22} >
          <Card className="blur-card" size={'small'} bordered={false} hoverable={false} >
            <DualAxes {...config} />
          </Card>
        </Col> : <></>}


        <Col span={22} >
          <Card size={'small'}
            bordered={false} hoverable={false} style={{ background: 'rgba(255, 255, 255, .3)', backdropFilter: 'blur(10px)' }}>
            <Divider orientation="left">
              Achievements
            </Divider>

            <Row gutter={[6, 6]} justify="center">
              <Col span={6}>
                <Card size={'small'} className="blur-card" bordered={false} hoverable={true}>
                  <Space style={{ width: '100%' }} size={15}>
                    <Avatar src={"https://joeschmoe.io/api/v1/random"} shape="square" />
                    <>成就名</>
                  </Space>
                  <Row>
                    <Progress size="small" percent={(10 / 20) * 100} status="active"
                      strokeColor={'#3220B9'} />
                  </Row>

                </Card>
              </Col>

              <Col span={6}>
                <Card size={'small'} className="blur-card" bordered={false} hoverable={true}>
                  <Space style={{ width: '100%' }} size={15}>
                    <Avatar src={"https://joeschmoe.io/api/v1/random"} shape="square" />
                    <>成就名</>
                  </Space>
                  <Progress size="small" percent={(10 / 20) * 100} status="active"
                    strokeColor={'#3220B9'} />
                </Card>
              </Col>

              <Col span={6}>
                <Card size={'small'} className="blur-card" bordered={false} hoverable={true}>
                  <Space style={{ width: '100%' }} size={15}>
                    <Avatar src={"https://joeschmoe.io/api/v1/random"} shape="square" />
                    <>成就名</>
                  </Space>
                  <Progress size="small" percent={(10 / 20) * 100} status="active"
                    strokeColor={'#3220B9'} />
                </Card>
              </Col>

              <Col span={6}>
                <Card size={'small'} className="blur-card" bordered={false} hoverable={true}>
                  <Space style={{ width: '100%' }} size={15}>
                    <Avatar src={"https://joeschmoe.io/api/v1/random"} shape="square" />
                    <>成就名</>
                  </Space>
                  <Progress size="small" percent={(10 / 20) * 100} status="active"
                    strokeColor={'#3220B9'} />
                </Card>
              </Col>


            </Row>

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