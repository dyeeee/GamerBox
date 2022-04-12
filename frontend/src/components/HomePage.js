import React from 'react'
import { Typography, Divider} from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

//This is the homepage, use <Typography> to typography the content.
export default function HomePage() {
  return (
    <Typography>
      <Title>Introduction</Title>
      <Paragraph>
      <Text keyboard>Antd</Text> is a React UI component library based on Ant Design system, which is mainly used to develop enterprise-level middle and back-end products.
      </Paragraph>
        <img style={{width: 200}} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt=''/>
        <div style={{display: 'inline-block'}}>
        <span style={{fontSize:40}}>+</span>
        </div>
        
        <img
          style={{width: 200}}
          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" alt=''
        />

     <br/><br/>
     {/*  Different levels represent the font size, and the higher the level, the smaller the font size*/}
        <Title level={3}>Features</Title>
        <Paragraph>
          <ul>
            <li>
            🌈 Enterprise-class UI designed for web applications.
            </li>
            <li>
            📦 A set of high-quality React components out of the box.
            </li>
            <li>
            🛡 Written in TypeScript with predictable static types.
            </li>
            <li>
            ⚙️ Whole package of design resources and development tools.
            </li>
            <li>
            🌍 Internationalization support for dozens of languages.
            </li>
            <li>
            🎨 Powerful theme customization in every detail.
            </li>
          </ul>
        </Paragraph>

        <Title level={3}>Necessary Dependncies / How to run this Demo</Title>
        <Paragraph>

        To use the <Text keyboard>Antd</Text>, you need to make sure you have <Text keyboard>React</Text> installed, i believe you already have React because you've been learning CS732 for a while now. Then, this use the <Text keyboard>React-router</Text>, so you need to install <Text keyboard>React-router</Text>.  

        You can use this command:  
          <Paragraph>
            <Text code style={{fontSize: 23}}>$ yarn add react-router-dom</Text>
          </Paragraph>
          <Title level={4}>How to install <Text keyboard>Antd</Text></Title>
          <Paragraph>
            You can use <Text keyboard>npm</Text> or <Text keyboard>yarn</Text>  to install.<br/>
            <Text code style={{fontSize: 23}}>$ npm install antd --save</Text><br/>
            or<br/>
            <Text code style={{fontSize: 23}}>$ yarn add antd</Text><br/>
          </Paragraph>
          <Title level={4}>Install <Text keyboard>Ant Dsign Charts</Text></Title>
          <Paragraph>
          In this demo, i use the <Text keyboard>Ant Dsign Charts</Text>, which is an additional chart libraries of <Text keyboard>Antd</Text>, so you need to run this command to install it.<br/>
          <Text code style={{fontSize: 23}}>$ yarn add @ant-design/charts</Text><br/>
          or<br/>
          <Text code style={{fontSize: 23}}>$ npm install @ant-design/charts --save</Text><br/>
          Using <Text keyboard>npm</Text> may have some problems, i recommend you use <Text keyboard>yarn</Text>.<br/>

          After you've installed all these dependncies, you can run <Text keyboard>yarn</Text> command to install the necessary files of <Text keyboard>yarn start</Text>.<br/>

          Then, run yarn <Text keyboard>yarn start</Text>, you can run this demo successfully.<br/>
          </Paragraph>
        </Paragraph>



      <Title level={2}>Resources</Title>
      <Paragraph>
        You can check out the development documentation on <Text keyboard>antd</Text>'s website: <Link href="https://ant.design/">https://ant.design/</Link>
      </Paragraph>

      <Divider />

    </Typography>
  )
}
