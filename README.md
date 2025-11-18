# SperoMind Frontend

## 📖 项目介绍

SperoMind前端项目，基于Vben Admin框架开发的现代化管理系统。

### 🎯 核心特性

- ✅ **现代化技术栈**: Vue 3 + TypeScript + Vite
- ✅ **组件库**: Ant Design Vue
- ✅ **构建工具**: Vite + Turbo (Monorepo)
- ✅ **包管理**: pnpm
- ✅ **代码规范**: ESLint + Prettier + Lefthook
- ✅ **后端集成**: 已完成Mock替换，对接SperoMind后端API

### 🏗️ 项目结构

```
spero-ui/
├── apps/                    # 应用目录
│   └── web-antd/           # 主应用 (基于Ant Design Vue)
├── packages/               # 共享包
├── internal/               # 内部工具
├── docs/                   # 文档
├── scripts/                # 构建脚本
└── README_SPERO.md         # 项目说明
```

### 🚀 快速开始

#### 环境要求
- Node.js >= 18
- pnpm >= 8

#### 安装依赖
```bash
pnpm install
```

#### 启动开发服务器
```bash
cd apps/web-antd
pnpm dev
```

#### 构建生产版本
```bash
cd apps/web-antd
pnpm build
```

### 🔧 配置说明

#### 后端API配置
项目已配置代理转发到SperoMind后端：

```typescript
// vite.config.mts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
    }
  }
}
```

#### 环境变量
```bash
# .env.development
VITE_GLOB_API_URL=/api
VITE_GLOB_API_URL_PREFIX=/api/v1
```

### 📝 开发指南

#### 1. 新增页面
在 `apps/web-antd/src/views/` 目录下创建页面组件

#### 2. 新增API
在 `apps/web-antd/src/api/` 目录下创建API接口文件

#### 3. 路由配置
在 `apps/web-antd/src/router/routes/` 目录下配置路由

### 🔐 认证集成

项目已完成与SperoMind后端的认证集成：

- ✅ 用户名密码登录
- ✅ JWT Token管理
- ✅ 刷新Token机制
- ✅ 权限控制
- ✅ 验证码集成

### 📊 功能模块

- ✅ 用户管理
- ✅ 角色管理  
- ✅ 菜单管理
- ✅ 权限控制
- ✅ 系统设置

### 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

### 📄 许可证

本项目基于 MIT 许可证开源。

### 🔗 相关链接

- [SperoMind后端项目](../mind-core/)
- [API文档](http://localhost:8080/swagger-ui.html)
- [前端开发文档](./docs/)

---

**注意**: 本项目基于Vben Admin框架进行二次开发，已移除原项目git历史，建立独立托管。
