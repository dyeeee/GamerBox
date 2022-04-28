import {React, useEffect, useState} from 'react'
import { Typography, Divider, Space, Card, Row, Col, Image, Spin, Modal, Pagination} from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom'

const { Title } = Typography;

const appIdList = [730, 570, 1599340, 578080, 1172470, 1245620, 271590, 1203220, 252490, 440, 431960, 1418630, 1623660, 1085660, 1794680];
const appName = ["Counter-Strike: Global Offensive", "Dota 2", "Lost Ark", "PUBG: BATTLEFROUDS", "Apex Legends", "ELDEN RING", "Grand Theft Auto V", "NARAKA:BLADPOINT", "Rust", "Team Fortress 2", "Wallpaper Engine", "Dread Hunger", "MIR 4", "Destiny 2", "Vampire Survivors"]
// const appIdList = [730]
// const appName = ["Counter-Strike: Global Offensive"]
const feedString = "PCGamesN"

//每个游戏读取多少条
const count = 2
//每页显示多少条
var pageCount = 5

var listData = []
var currentPageData = []

function getImg(text){
  let reg = /<img.*?src=[\"|\'](.*?)[\"|\'].*?>/

  //反选，只要正文
  // const value = text.replace(reg, '')

  //返回正则匹配的字符串
  reg.exec(text);

  //下面这俩会返回true和false来表示是否匹配到正则
  // const patt = new RegExp(reg,"g");
  // const result = patt.test(text);
  if (reg.test(text)) {
    return RegExp.$1
  } else {
    return ""
  }
}

function getSummary(text) {
  let reg = /<img.*?src=[\"|\'](.*?)[\"|\'].*?>/
  const value = text.replace(reg, '')
  return value
}

function getDate(unix) {
  //创建一个指定的日期对象
  var temp_time = new Date(unix * 1000);
  //取得4位数的年份
  var year = temp_time.getFullYear();  
  //取得日期中的月份，其中0表示1月，11表示12月
  var month = temp_time.getMonth()+1;  
  //小于10月的月份补全0 例如1月补全为01月
  month = month < 10 ? "0"+month:month;
  //返回日期月份中的天数（1到31）
  var day = temp_time.getDate();  
  day = day < 10 ? "0"+day:day;
  //返回日期中的小时数（0到23）
  var hour = temp_time.getHours(); 
  hour = hour < 10 ? "0"+hour:hour;
  //返回日期中的分钟数（0到59）
  var minute = temp_time.getMinutes(); 
  minute = minute < 10 ? "0"+minute:minute;

  //拼接需要的时间格式
  var  result_time = year+"-"+month+"-"+day+" "+hour+":"+minute
  return result_time
}

function showhtml(htmlString){
  var html = {__html:htmlString};
  return <div dangerouslySetInnerHTML={html}></div>;
}

async function getNews (i){
    await axios.post('/api/steamApi/getNews', {appid: appIdList[i], count:count, feeds: feedString })
    .then(response => {
      console.log(response.data);
      const manyNews = response.data.map(news => ({id: news.gid, title: news.title, url:news.url, author:news.author, content:news.contents, date:news.date}));
      manyNews.forEach(oneNews => {
        oneNews.appName = appName[i]
        oneNews.img = getImg(oneNews.content)
        oneNews.summary = getSummary(oneNews.content)
        oneNews.unix = oneNews.date
        oneNews.date = getDate(oneNews.date)
        oneNews.logo = 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + appIdList[i] + '/capsule_231x87.jpg'
        listData.push(oneNews)
      });
    })
    .catch(error => {
      console.log(error);
    })
};

//slice(0,5) 切割array的函数，包括开头，不包括结尾 0,5 就是0-4
async function paging(listData, currentPage, pageCount){
  const start = (currentPage - 1)  * pageCount;
  return listData.slice(start, currentPage * pageCount);
}

export default function NewsPage () {
  const [isLoading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function fetchData(){
      setLoading(true);
      try{
        if(refresh){
          for(let i = 0; i < appIdList.length; i++){
            await getNews(i);
          }
          setRefresh(false)
        }
        currentPageData = await paging(listData, currentPage, pageCount)
        setLoading(false);
      } catch{
        setLoading(false);
      }
    }
    fetchData();
  }, [currentPage]);
  
  // 按日期排序！
  sortListByDate();

  const ShowNews = ()=> {
    const [isModalVisible, setIsModalVisible] = useState(false)
  
    var [temp,setTemp] = useState({id: "", title: "", url:"", author:"", content:"", date:""});
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  
    return (
  
      <Typography>
        <Title>News</Title>
        <Divider />
  
        <Space direction="vertical" size="large"  style={{ minWidth: '100%', padding: '0 30px' }}>
          {currentPageData.map((news, index) => (
             <Card size="small" hoverable="true"  style={{ height: '220px', minWidth: '100%', background: 'rgba(255, 255, 255, .3)'}} onClick={(e) => {
              e = index;
              setTemp(currentPageData[e]);
              // temp = listData[e];
              console.log(e);
              console.log(temp);
              setIsModalVisible(true);
            }}>
              <Row  align="top">
                <Col span={14}>
                  <div style={{display: 'flex', alignItems: 'center', padding: '5px', borderRadius: '5px', background: 'rgba(255, 255, 255, .1)'}}>
                    <img src={news.logo} style={{width: '15%'}}></img>
                    <div  style={{width: '2%'}}></div>
                    <div style={{fontSize: '20px'}}>{news.appName}</div>
                  </div>
                  {/* news title */}
                  <div style={{fontSize: '25px', fontWeight: '500', marginTop: '5px',
                  overflow:'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{news.title}</div>
                  {/* date */}
                  <div style={{marginTop: '2px', marginBottom: '2px'}}>{news.date}</div>
                  {/* summary*/}
                  <div style={{fontSize: '15px', marginTop: '5px', maxHeight: '68px',
                  overflow: 'hidden', textOverflow: 'ellipsis', display:'-webkit-box', webkitBoxOrient:'vertical', webkitLineClamp: '3'}}>{showhtml(news.summary)}</div>
                </Col>
                <Col span={1}></Col>
    
                <Col span={9}>
                  {
                    news.img != "" ? <Image src={news.img} style={{height: '195px', paddingLeft: '20px'}}></Image> 
                    : <Image src="./noimg.svg" style={{height: '195px', paddingLeft: '20px'}}></Image>
                  }
                </Col>
              </Row>
           </Card>
          ))}
  
          <div style={{textAlign: 'center'}}>
            <Pagination defaultCurrent={currentPage} total={listData.length} defaultPageSize={pageCount} showSizeChanger={false} onChange={page => {
                setCurrentPage(page)
                // window.location.href = '/NewsPage/' + page;
            }} />
          </div>
  
        </Space>
  
        <Modal className='news-model' title={temp.title} visible={isModalVisible} footer={null} onOk={handleOk} onCancel={handleCancel} 
              style={{ top: 89}} width={1000}>
              <div>{showhtml(temp.content)}</div>
        </Modal>
                  
      </Typography>
    )
  }

  return (
    <div>
      {isLoading ? <ShowLoading /> : <ShowNews />}
    </div>
  )
    
}



function ShowLoading() {
  return (
    <div style = {{textAlign: 'center'}}>
      <Space size = "large">
        <Spin tip="Loading..." size = "large"/>
      </Space>
    </div>
  )
}

function sortListByDate() {
  listData.sort(function(a, b){return b.unix - a.unix});
}

