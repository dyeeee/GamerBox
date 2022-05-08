import React from 'react'
import usePost from '../usePost';
import { Typography, Divider, Space, Card, Row, Col, Image, Spin, Modal, Carousel, List, message, Avatar} from 'antd';
import RankList from './RankList';
const { Title } = Typography;
const {Meta} = Card;

function showhtml(htmlString){
  var html = {__html:htmlString};
  return <div dangerouslySetInnerHTML={html}></div>;
}

//This is the homepage, use <Typography> to typography the content.
export default function HomePage() {
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  return (
  
    <Typography>
      {/* Background of Title */}
      <div style={{textAlign: 'center'}}>
        {/* Title */}
        <div style={{fontSize: '70px', fontWeight: '500', marginTop: '5%'}}>
          Hello! This is title</div>
          
        {/* 可能的在线人数 */}
        <div style={{fontSize: '30px', fontWeight: '500', marginTop: '1%'}}><span style={{color: '#f6622a'}}>000, 000, 000</span> users online</div>
      </div>

      <Row style={{marginTop: '5%'}} gutter={32} align="top">
        {/* News */}
        <Col span={11} offset={3}>
          <div style={{fontSize: '30px', fontWeight: '400', marginBottom: "1%"}}>News</div>
          <Carousel autoplay>
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
        </Col>

        {/* Rank */}
        <Col span={7}>
          <div style={{fontSize: '30px', fontWeight: '400', marginBottom: "1%"}}>Everyone is playing</div>
          <RankList></RankList>
        
        </Col>
      </Row>

      <Row justify='center' style={{marginTop: "5%"}} gutter={32} >
        <Col span={6}>
          <Card
            hoverable
            style={{}}
            cover={<img alt="example" src="./noimg.svg" />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>

        <Col span={6}>
          <Card
            hoverable
            style={{}}
            cover={<img alt="example" src="./noimg.svg" />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        
        <Col span={6}>
          <Card
            hoverable
            style={{}}
            cover={<img alt="example" src="./noimg.svg" />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>

      </Row>


      
                
    </Typography>
  )
}

  // const cart = {
  //   appid:'730',
  //   count:'3'
  // }

  // const {data: newsData, error : isError} = usePost('/api/steamApi/getNews', [], cart);
  // console.log(isError);
  // if(isError){
  //   return(
  //     <div>
  //       error
  //     </div>
  //   )
  // }

  // const newsSummaries = newsData.map(news => ({id: news.gid, title: news.title, url:news.url, author:news.author, content:news.contents}));

  // return (
  //   <div>
  //     {newsSummaries.map(os => (
  //         <div key={os.id}>
  //           <p>{os.id}</p>
  //           {showhtml(os.content)}
  //         </div>
  //     ))}
  //     </div>
  // )


