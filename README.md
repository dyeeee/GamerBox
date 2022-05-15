# CS732 Project - GamerBox

[English](#) ｜ [Chinese](#GamerBox中文文档)

## Intro

This project aims to design, implement, test and deploy a cross-platform web application that can process, analyse and visualise data about video games and video game online stores. This application can share and display news, update status, achievement about popular video games. This application can also check the play status and purchased games of players who provide their api key in video game online stores. Our motivation for choosing this topic is providing players with a convenient game data query platform Detailed statistics and data visualisation of popular games not only help game developers get the most popular types of game, but also help players choose those games which are high-quality and recommended. The latest news, update information and sales of popular games can prevent players from missing their favourite games. Players can easily check their game achievements, personal accounts and other information by querying on the website.

## Features

* Latest Game News
* Personal Game Data Display
  * Steam level
  * Game data
  * Achievements
  * Friends
* Popular Games Visualization
  * Current number of players
  * Visualization of recent changes in the number of players
* Game Details
  * Screenshots
  * Publishers
  * Genre
  * Supports
  * Achievements

## Used Technics 

* React Framework
* Express
* MongoDB
* AntDesign UI Framework

## Setup 

### Start Backend

Make sure **MongoDB** is started!!

Run following code to add dependencies and initilize under **./backend**：

```
yarn
yarn add axios
yarn add nodemon
yarn add mongoose
yarn run init-db
```

* axios: Request API
* nodemon: Hot deployment
* mongoose: MongoDB for React
* init-db: Excute MongoDB initial code


Run following code  under **./backend** to start backend:
```
yarn start
```


### Start Frontend

Run following code to add dependencies and initilize under **./forntend**:

```
yarn
yarn add axios

yarn add antd
yarn add @ant-design/charts --save

yarn add @craco/craco
yarn add craco-less
```

* axios: Request API

* antd & @ant-design/charts: UI Framework

* @craco/craco & craco-less: Modify theme


Run following code  under **./forntend** to start frontend:

```
yarn start
```

### Note

1. When using the yarn add command to download dependencies (especially Ant Design dependencies), you may be prompted for network connection problem, even though your network is normal. Please try several times if you meet this problem.
2. Since the data request is based on steamAPI, it may take some time to load if the network quality is not good.
3. The personal detail page needs to enter the personal steamID. Project developer's page is displayed by default. The following IDs are available for test:  
   * 76561198402813649
   * 76561198302224528
   * 76561198399481384


## Screenshots





# GamerBox中文文档

## 简介

该项目旨在设计、实现、测试和部署一个跨平台的web应用程序，它可以处理、分析和可视化有关电子游戏和电子游戏在线商店的数据。该应用程序可以分享和显示新闻、更新状态、游戏成就和游戏简介。该应用程序还可以检查在电子游戏在线商店中提供api密钥的玩家的游戏状态和购买的游戏。我们选择这个主题的动机是为玩家提供一个方便的游戏数据查询平台。对流行游戏的详细统计和数据可视化不仅可以帮助游戏开发者获得最受欢迎的游戏类型，还可以帮助玩家选择那些高质量和推荐的游戏。最新的消息、更新信息和流行游戏的销售可以防止玩家错过他们最喜欢的游戏。玩家可以通过在网站上的查询，轻松地查看他们的游戏成就、个人账户和其他信息。

## 功能
* 最新游戏新闻
* 个人游戏数据展示
  * Steam等级
  * 游戏数据
  * 成就
  * 好友
* 热门游戏可视化
  * 当前玩家人数
  * 近期玩家数量变化
* 游戏详情
  * 游戏图片
  * 出版商
  * 游戏类型
  * 支持情况
  * 游戏成就

## 技术栈

* React Framework
* Express
* MongoDB
* AntDesign UI Framework

## 配置及启动
### 后端

请确保**MongoDB**数据库已经启动!!

在 **./backend**路径下执行以下代码：

```
yarn
yarn add axios
yarn add nodemon
yarn add mongoose
yarn run init-db
```

* axios: API请求
* nodemon: 后端热更新
* mongoose: MongoDB for React
* init-db: 执行数据库初始化代码


启动后端，在 **./backend**路径下执行以下代码
```
yarn start
```


### 前端

在 **./frontend**路径下执行以下代码：

```
yarn
yarn add axios

yarn add antd
npm install @ant-design/charts --save

yarn add @craco/craco
yarn add craco-less
```

* axios: Request API

* antd & @ant-design/charts: UI 框架

* @craco/craco & craco-less: 主题修改

启动前端，在 **./frontend**路径下执行以下代码：
```
yarn start
```

### 注意事项
1. 当您使用 yarn add 命令下载依赖项（尤其是Ant Design相关的依赖项）时，即使您的网络正常，也可能会提示网络连接问题。如果您遇到此问题，请多重试几次。
2. 由于数据的请求基于steamAPI，如果网络质量不佳，可能需要加载一定的时间。
3. 个人详情页需要输入个人steamID，默认展示的是项目开发者的个人页面。以下ID可供查询：
   * 76561198402813649
   * 76561198302224528
   * 76561198399481384

## 项目截图

