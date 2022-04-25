import { useState, useEffect } from "react";
import * as React from "react";
import { Form, Input, Button, Card, notification } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import axios from "axios";
import useGet from "../useGet";
import { Line } from '@ant-design/plots';
import gameData from '../gameData.json';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { offset: 5, span: 18 },
};

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
      window.location.href = '/'
    }, 1000)
    console.log(values)
  }
  const onFinishFailed = () => {
    notification.open({
      message: '登陆失败',
      description: '请您完善表单！',
      icon: <FrownOutlined style={{ color: '#ff4d4f' }} />
    });
  }

  return (
    <Card style={{ background: 'rgba(255, 255, 255, .7)', backdropFilter: 'blur(10px)' }}>
      <Card.Grid style={{ width: '100%' }}>
        <Form
          {...layout}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ width: '480px', padding: '40px 0 0 20px' }}
        >
          <Form.Item
            label="账号"
            name="username"
            rules={[{ required: true, message: '请输入!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button loading={loading} type="primary" htmlType="submit" style={{ width: '100%' }}>
              登陆
            </Button>
          </Form.Item>
        </Form>
      </Card.Grid>
    </Card>
  )
}

export default function TestPage1 () {
  const config = {
    data: gameData,
    padding: 'auto',
    xField: 'DateTime',
    yField: 'Players',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
  };

  return <Line {...config} />;
}

// .target {
//   background: rgba(255, 255, 255, .7);
//   -webkit-backdrop-filter: blur(10px);
//   backdrop-filter: blur(10px);
// }
