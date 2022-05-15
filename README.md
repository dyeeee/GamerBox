# CS732 Project - GamerBox

[English](#) ｜ [Chinese](#GamerBox中文文档)

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

Run following code to add dependencies and initilize under ./backend：

```
yarn
yarn add axios
yarn add nodemon
run init-db ??
```

Run following code to get start under ./backend：

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

Run following code to get start under ./forntend:

```
yarn start
```

## Screenshots





# GamerBox中文文档

## 功能

## 技术栈

* React Framework
* Express
* MongoDB
* AntDesign UI Framework

## 配置及启动
### 后端

安装了axios用于请求api
```
yarn add axios
```

热更新： nodemon包
```
yarn add nodemon
```

需要创建配置文件 nodemon.json  
restartable: 设置重启模式  
ignore: 设置忽略文件  
verbose: 设置日志输出模式，true 详细模式  
execMap: 设置运行服务的后缀名与对应的命令  

然后将package.json中的"scripts"中的start中的node替换为 nodemon，表示以后yarn start都是用nodemon来启动，而不是node



### 前端

#### 基本运行要下的包：

```
yarn
```

```
yarn add antd
```

#### 修改主题需要下载的包：

```
yarn add @craco/craco
```

```
yarn add craco-less
```

具体配色如何改？ 参考：https://ant.design/docs/react/customize-theme-cn  

然后再craco.config.js里面改

#### 数据可视化

antd 所属的      ant design charts 或者  antv 选一个？

前端安装
```
yarn add axios

npm install @ant-design/charts --save
```


