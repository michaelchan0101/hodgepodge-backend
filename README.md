# Hodgepodge
基于 `Next.js` 开发的博客系统
依赖技术
- Node.js >= 12
- Docker
- MySQL
- Typescript
- Yarn
- Next.js

## 项目结构

目录结构

```
.
|-- client
|   |-- components
|   |-- pages
|   |-- services
|   |-- styles
|   |-- types
|   |-- next-env.d.ts
|   |-- package.json
|   |-- tsconfig.json
|-- server
|   |-- public
|   |-- src
|   |   |-- cli
|   |   |-- config
|   |   |-- controllers
|   |   |-- drivers
|   |   |-- errors
|   |   |-- interfaces
|   |   |-- middwares
|   |   |-- migrations
|   |   |-- models
|   |   |-- services
|   |   |-- test
|   |   |-- transformers
|   |   |-- utils
|   |   |-- app.ts
|   |   |-- index.ts
```

## 项目 Scripts

```bash
# 在本地开发环境启动服务
yarn dev

# 后台运行相关的依赖，例如：MySQL
yarn docker:up

# 停止运行相关的依赖，例如：MySQL
yarn docker:down

# 构建 server
yarn build:server

# 构建 client
yarn build:client


# 跑 server 的单元测试
yarn test:server

# 运行 eslint 语法检查
yarn lint

# 运行 eslint 语法检查并修复
yarn lint:fix
```


## 项目启动

First, run the development server:

```bash
yarn

yarn docker:up

cp client/.env.example client/.env

cp server/.env.example server/.env

yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `client/pages/index.js`. The page auto-updates as you edit the file.
