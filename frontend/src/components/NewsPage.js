import React from 'react'
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

//This is the homepage, use <Typography> to typography the content.
export default function NewsPage () {
  return (
    <Typography>
      <Title>News</Title>

      <Divider />

    </Typography>
  )
}
