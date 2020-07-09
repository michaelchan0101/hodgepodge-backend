# Hodgepodge
基于 `Next.js` 开发的博客系统
依赖技术
- Node.js >= 12
- Docker
- MySQL
- Typescript
- Yarn

## 项目结构

目录结构

```
.
|-- src
|   |-- cli
|   |-- config
|   |-- controllers
|   |-- drivers
|   |-- errors
|   |-- interfaces
|   |-- middwares
|   |-- migrations
|   |-- models
|   |-- services
|   |-- test
|   |-- transformers
|   |-- utils
|   |-- app.ts
|   |-- index.ts
```

## 项目 Scripts

```bash
# 在本地开发环境启动服务
yarn dev

# 构建
yarn build

# 跑 server 的单元测试
yarn test

# 运行 eslint 语法检查
yarn lint

# 运行 eslint 语法检查并修复
yarn lint:fix
```


## 项目启动


```bash
yarn

docker-composer up -d

cp .env.example .env

yarn dev
```

- [API HOST](http://localhost:3000/)