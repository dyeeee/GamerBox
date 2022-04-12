import React from 'react'
import { Outlet, Link, useLocation } from "react-router-dom"
import { Menu,Layout } from 'antd';
import { CalendarOutlined, CameraOutlined, HomeOutlined,AreaChartOutlined,SettingOutlined,FileDoneOutlined,UserOutlined,LaptopOutlined,NotificationOutlined } from '@ant-design/icons';
import './MainLayout.css';



const { Header, Content, Footer } = Layout;

export default function MainLayout() {
    let location = useLocation();
    let x = location.pathname;
    
    return (
        <Layout className="layout">
        <Header>
        <div className="logo" style={{float:'left',marginLeft:'-30px'}}>
            <img src='favicon.ico' height = '32'alt=''/>
        </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{marginLeft:'300px'}}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '25px 50px'}}>
          
          <div className="site-layout-content">Content</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    )
}
