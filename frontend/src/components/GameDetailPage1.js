import React, { useRef, useState, useEffect } from 'react'
import { Typography, Divider, PageHeader, Row, Col, Card, Space, Avatar, Image, Tag, Carousel, Skeleton, Tooltip, Button, Input, Spin, Pagination } from 'antd';
import { Liquid } from '@ant-design/charts';
import { Line, DualAxes } from '@ant-design/plots';
import "../css/GlobalCSS.css"
import useGet from "../useGet";
import axios from "axios";
import { useParams } from 'react-router-dom';

export const AuthContext = React.createContext({});


const { Title, Paragraph, Text, Link } = Typography;
const { Search } = Input;

const tagColor = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue"]
const tagColor2 = ["#2db7f5", "#87d068", "#108ee9"]


const imgStyle = {
  height: '100%',
  objectFit: 'cover',
  width: '100%'
}

var gameData = null;
var achievements = null;

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

async function getAchievements (uid) {
  await axios.post('/api/steamApi/getAchievementsDetail', { appid: uid })
    .then(response => {
      achievements = response.data;
      console.log(achievements)
    })
    .catch(
      console.log(achievements),
      console.log("error acheiv")
    )
};



export default function GameDetailPage1 () {
  const params = useParams();
  const curID = params.id;
  const { data: testdata } = useGet('/api/fetchData/' + curID, []);
  // console.log(testdata.length === 0)
  const config = {
    data: [testdata, testdata],
    padding: 'auto',
    xField: 'DateTime',
    yField: ['Players', 'PlayersTrend'],
  };

  const [isLoading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  var achievementCheck = true

  useEffect(() => {
    async function fetchData () {
      setLoading(true);
      try {
        await getGame(curID);
        await getAchievements(curID);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }
    fetchData();
  }, [refresh]);

  return (
    <div className="game-detail-color" style={{ background: `url('../../bg1.jpg')` }}>
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
                    <Carousel autoplay>
                      {
                        gameData.screenshots.map((obj, index) => (

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
                    Genres and Categories
                  </Divider>
                  <Row gutter={[10, 10]}>
                    {
                      gameData.genres.map((obj, index) => (
                        <Tag color={tagColor2[parseInt(Math.random() * tagColor2.length)]}>{obj.description}</Tag>
                      ))
                    }
                  </Row>

                  {/* <Tag color="magenta">??????</Tag>
                  <Tag color="red">??????</Tag>
                  <Tag color="volcano">????????????</Tag>
                  <Tag color="orange">??????</Tag> */}
                </Col>

                <Col span={24}>
                  <Row gutter={[10, 10]}>
                    {
                      gameData.categories.map((obj, index) => (
                        <Tag color={tagColor[parseInt(Math.random() * tagColor.length)]}>{obj.description}</Tag>
                      ))
                    }
                  </Row>
                </Col>


                <Col span={24}>
                  <Divider orientation="left">
                    Description
                  </Divider>
                  <Text>{gameData.short_description}</Text>
                  <>
                    {showhtml(gameData.about_the_game)}
                  </>
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
          {isLoading ? <Spin /> :
            <Card size={'small'}
              bordered={false} hoverable={false} style={{ background: 'rgba(255, 255, 255, .3)', backdropFilter: 'blur(10px)' }}>
              <Divider orientation="left">
                Achievements
              </Divider>

              <Row gutter={[6, 6]} justify="center">
                {
                  achievements.length === 0 ?
                    <>API Error</> :
                    achievements.map((obj, index) => (
                      <Col span={6}>
                        <Tooltip placement="top" title={obj.description}>
                          <Card className={'ant-card-small-achive'} size={'small'} bordered={false} hoverable={true}>
                            <Space style={{ width: '100%' }} size={10}>
                              <Avatar src={obj.icon} shape="square" />
                              <Text level={6}
                                style={{ maxWidth: 120 }}
                                ellipsis={{ rows: 1, expandable: false }}>
                                {obj.displayName}
                              </Text>
                            </Space>
                          </Card>
                        </Tooltip>
                      </Col>

                    ))
                }
              </Row>

            </Card>
          }
        </Col>





      </Row >



      <Row gutter={[16, 16]} justify="center" style={{ padding: '36px 14px 14px' }} >
        <Paragraph>
          Data from <Text keyboard>Valve</Text>'s API: <Link href="https://ant.design/">https://ant.design/</Link>
        </Paragraph>
      </Row >
    </div >
  )
}

function showhtml (htmlString) {
  var html = { __html: htmlString };
  return <div dangerouslySetInnerHTML={html}></div>;
}