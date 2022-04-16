import React from 'react'
import { Typography, Divider, Space, Card, Row, Col} from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

//This is the homepage, use <Typography> to typography the content.
export default function NewsPage () {
  return (
    <Typography>
      <Title>News</Title>
      <Divider />

      <Space direction="vertical" size="large"  style={{ minWidth: '100%', padding: '0 30px' }}>
        <Card size="small" hoverable="true"  style={{ height: '220px', minWidth: '100%' }}>
          <Row  align="top">
            <Col span={14} style={{background: 'red'}}>
              <div style={{fontSize: '20px'}}>Game Topic</div>
              <div style={{fontSize: '25px', fontWeight: '500', marginTop: '20px'}}>News Topic</div>
              <div style={{marginTop: '5px'}}>Type X hours ago</div>
              <div style={{fontSize: '15px', marginTop: '5px', 
              overflow: 'hidden', textOverflow: 'ellipsis', display:'-webkit-box', webkitBoxOrient:'vertical', webkitLineClamp: '3'}}>News Content This is text  This is text  This is text  This is text  This is text  This is text  This is text  This is text  This is text  This is text  This is text  This is text  This is text  This is text   This is text  This is text  This is text   This is text  This is text  This is text   This is text  This is text  This is text </div>
            </Col>
            <Col span={1} style={{background: 'green'}}>space</Col>

            <Col span={9} style={{background: 'blue'}}>
              <img src='./testimg.png' style={{height: '195px', paddingLeft: '20px'}}></img>
            </Col>
          </Row>
        </Card>
      </Space>
      

    </Typography>
  )
}
