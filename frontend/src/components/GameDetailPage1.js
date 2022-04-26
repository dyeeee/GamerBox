import React, { useRef, useState, useEffect } from 'react'
import { Typography, Divider, PageHeader, Row, Col, Card, Space, Avatar, Image, Tag, Carousel, Progress, List, Button, Input, Spin, Pagination } from 'antd';
import { Liquid } from '@ant-design/charts';
import "../css/GlobalCSS.css"
export const AuthContext = React.createContext({});

const { Title, Paragraph, Text, Link } = Typography;
const { Search } = Input;


const imgStyle = {
  height: '100%',
  objectFit: 'cover',
  width: '100%'
}


export default function GameDetailPage1 () {
  const config = {
    width: 150,
    padding: [0, 0, 0, 0],
    percent: 0.25,
    shape: 'diamond',
    outline: {
      border: 4,
    },
    wave: {
      length: 128,
    },
  };

  return (
    <div style={{ background: `url('../../bg1.jpg')` }}>
      <PageHeader
        className="site-page-header"
        title="Game Detail Page"
        subTitle={"ID: 527230"}
      />


      <Row gutter={[16, 16]} justify="center">
        <Col span={22} >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Card bordered={false} hoverable={false} style={{ background: 'rgba(255, 255, 255, .3)', backdropFilter: 'blur(10px)' }}>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Space direction="vertical" style={{ width: '100%' }} >
                    <Image src={"https://cdn.akamai.steamstatic.com/steam/apps/527230/header_alt_assets_6_schinese.jpg?t=1650562898"} />

                    <Text strong={true}>For the King</Text>
                    <Text strong={true}>发行日期: </Text>
                    <Text strong={true}>发行商: </Text>
                    <Text strong={true}>开发商: </Text>

                  </Space>
                </Col>

                <Col span={16} >

                  <Carousel dotPosition={'right'} autoplay>
                    <div>
                      <img alt="1" style={imgStyle} src="https://cdn.akamai.steamstatic.com/steam/apps/527230/ss_d837da91acf3aee05bee799ae609ae4e8005254d.600x338.jpg?t=1650562898" />
                    </div>
                    <div>
                      <img alt="3" style={imgStyle} src="https://cdn.akamai.steamstatic.com/steam/apps/527230/ss_7a9fb2fcdc70305d7e32d522cefc145f04cb7c7e.600x338.jpg?t=1650562898" />
                    </div>
                    <div>
                      <img alt="4" style={imgStyle} src="https://cdn.akamai.steamstatic.com/steam/apps/527230/ss_4a134d4b37032fe078d3487dfdab547275327dd5.600x338.jpg?t=1650562898" />
                    </div>
                  </Carousel>


                </Col>
              </Row>


            </Card>

          </Space>

        </Col>

        <Col span={22} >
          <Card size={'small'} bordered={false} hoverable={false} style={{ background: 'rgba(255, 255, 255, .3)', backdropFilter: 'blur(10px)' }}>
            <Space direction="vertical" style={{ width: '100%' }} size={10}>

              <Col span={24}>
                <Divider orientation="left">
                  Genres
                </Divider>
                <Tag color="magenta">冒险</Tag>
                <Tag color="red">独立</Tag>
                <Tag color="volcano">角色扮演</Tag>
                <Tag color="orange">策略</Tag>
              </Col>



              <Col span={24}>
                <Divider orientation="left">
                  Description
                </Divider>
                <Text>《为了吾王》是一款结合桌游和 roguelike 类型元素的跨界策略 RPG 游戏。可以单机进行单人游戏或者在线多人合作。培养你的角色，极致发挥你的战术和策略。游戏支持中文。</Text>
              </Col>

            </Space>
          </Card>
        </Col>

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