import React from 'react'
import { Outlet, Link, useLocation } from "react-router-dom"
import { Menu, Layout } from 'antd';
import './MainLayout.css';



const { Header, Content, Footer } = Layout;

export default function MainLayout () {
  let location = useLocation();
  let x = location.pathname;

  return (
    <Layout className="layout">
      <Header style={{ position: 'fixed', width: '100%', zIndex: '100000' }}>
        <div className="logo" style={{ float: 'left', marginLeft: '-30px' }}>
          <img src='logo1.png' height='48' alt='' />
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ marginLeft: '300px' }}>
          <Menu.Item key="/HomePage"><Link to='/'>GamerBox</Link></Menu.Item>
          <Menu.Item key="/PersonalPage"><Link to='/PersonalPage/76561198302224528'>Personal</Link></Menu.Item>
          <Menu.Item key="/RankPage"><Link to='/RankPage'>Popular</Link></Menu.Item>
          <Menu.Item key="/NewsPage"><Link to='/NewsPage'>News</Link></Menu.Item>
          <Menu.Item key="/GameDetailPage1"><Link to='/GameDetailPage/730'>GameDetail</Link></Menu.Item>
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
