# CS732 Project - GamerBox

[English](#) ｜ [Chinese](#GamerBox中文文档)

## Intro

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

Run following code to add dependencies and initilize under ./backend：

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


Run following code  under ./backend to start backend:
```
yarn start
```


### Start Frontend

Run following code to add dependencies and initilize under ./forntend:

```
yarn
yarn add axios

yarn add antd
npm install @ant-design/charts --save

yarn add @craco/craco
yarn add craco-less
```

* axios: Request API

* antd & @ant-design/charts: UI Framework

* @craco/craco & craco-less: Modify theme


Run following code  under ./forntend to start frontend:

```
yarn start
```

### Note

1. Since the data request is based on steamAPI, it may take some time to load if the network quality is not good.
2. The personal detail page needs to enter the personal steamID. Project developer's page is displayed by default. The following IDs are available for test:


## Screenshots





# GamerBox中文文档

## 简介


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

在 ./backend路径下执行以下代码：

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


启动后端，在 ./backend路径下执行以下代码
```
yarn start
```


### 前端

在 ./frontend路径下执行以下代码：

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

启动前端，在 ./frontend路径下执行以下代码：
```
yarn start
```

### 注意事项
1. 由于数据的请求基于steamAPI，如果网络质量不佳，可能需要加载一定的时间。
2. 个人详情页需要输入个人steamID，默认展示的是项目开发者的个人页面。以下ID可供查询：


## 项目截图

