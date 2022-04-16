import React from 'react'
import { Outlet, Link, useLocation } from "react-router-dom"
import { Menu, Layout } from 'antd';
import { CalendarOutlined, CameraOutlined, HomeOutlined, AreaChartOutlined, SettingOutlined, FileDoneOutlined, UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import './MainLayout.css';



const { Header, Content, Footer } = Layout;

export default function MainLayout () {
  let location = useLocation();
  let x = location.pathname;

  return (
    <Layout className="layout">
      <Header style={{ position: 'fixed', width: '100%', zIndex: '100000' }}>
        <div className="logo" style={{ float: 'left', marginLeft: '-30px' }}>
          <img src='favicon.ico' height='32' alt='' />
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ marginLeft: '300px' }}>
          <Menu.Item key="/HomePage"><Link to='/'>GamerBox</Link></Menu.Item>
          <Menu.Item key="/PersonalPage"><Link to='/PersonalPage'>Personal</Link></Menu.Item>
          <Menu.Item key="/RankPage"><Link to='/RankPage'>Rank</Link></Menu.Item>
          <Menu.Item key="/NewsPage"><Link to='/NewsPage'>News</Link></Menu.Item>
          <Menu.Item key="/TestPage1"><Link to='/TestPage1'>Test</Link></Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '25px 200px', marginTop: '64px' }}>

        <div className="site-layout-content">
          <Outlet />
        </div>

      </Content>
      <Footer style={{ textAlign: 'center' }}>CS732 Project - GamerBox ©2022 Created by Hardy Huskies </Footer>
    </Layout>
  )
}
