# SperoMind 前端 Mock 替换完成说明

## 🎯 替换概述

已成功将 Vben Admin 前端项目中的 mock 接口替换为 SperoMind 后端真实接口，实现了前后端的完整对接。

## 📋 完成的工作

### 1. **配置更新**

#### Vite 代理配置 (`vite.config.mts`)
```typescript
// 禁用 mock 服务
application: {
  nitroMock: false,
}

// 配置后端代理
server: {
  proxy: {
    '/api': {
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
      target: 'http://localhost:8080', // SperoMind 后端服务
      ws: true,
    },
  },
}
```

#### 请求响应格式配置 (`request.ts`)
```typescript
// 更新成功码为 200 (SperoMind 后端格式)
client.addResponseInterceptor(
  defaultResponseInterceptor({
    codeField: 'code',
    dataField: 'data',
    successCode: 200,
  }),
);
```

### 2. **认证接口更新**

#### 登录接口 (`auth.ts`)
```typescript
export interface LoginParams {
  username: string;
  password: string;
  captcha?: string;      // 验证码
  captchaKey?: string;   // 验证码key
}

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
```

#### 新增接口
- `getCaptchaApi(captchaKey: string)` - 获取验证码
- `getUserInfoApi()` - 获取用户信息
- `refreshTokenApi(refreshToken: string)` - 刷新令牌

### 3. **登录页面更新**

#### 登录表单 (`login.vue`)
- 移除了滑块验证码
- 添加了文本验证码输入
- 添加了验证码图片显示
- 支持点击刷新验证码

#### 验证码流程
```typescript
// 生成验证码
const generateCaptcha = async () => {
  captchaKey.value = Date.now().toString();
  const captcha = await getCaptchaApi(captchaKey.value);
  captchaImage.value = captcha;
};
```

### 4. **系统管理接口**

#### 用户管理 (`system/user.ts`)
- `getUserPageApi()` - 分页查询用户
- `createUserApi()` - 创建用户
- `updateUserApi()` - 更新用户
- `deleteUserApi()` - 删除用户
- `changeUserStatusApi()` - 修改用户状态
- `resetUserPasswordApi()` - 重置密码

#### 角色管理 (`system/role.ts`)
- `getRoleListApi()` - 查询角色列表
- `createRoleApi()` - 创建角色
- `updateRoleApi()` - 更新角色
- `assignRoleMenusApi()` - 分配菜单权限

#### 菜单管理 (`system/menu.ts`)
- `getMenuTreeApi()` - 获取菜单树
- `getUserMenuTreeApi()` - 获取用户菜单
- `createMenuApi()` - 创建菜单
- `updateMenuApi()` - 更新菜单

### 5. **状态管理更新**

#### 认证状态 (`auth.ts`)
```typescript
// 处理双令牌
const { accessToken, refreshToken } = await loginApi(params);
accessStore.setAccessToken(accessToken);
accessStore.setRefreshToken(refreshToken);

// 刷新令牌逻辑
async function doRefreshToken() {
  const refreshToken = accessStore.refreshToken;
  const resp = await refreshTokenApi(refreshToken);
  accessStore.setAccessToken(resp.data.accessToken);
  accessStore.setRefreshToken(resp.data.refreshToken);
}
```

## 🔄 API 路径映射

| 原Mock路径 | SperoMind后端路径 | 说明 |
|-----------|------------------|------|
| `/auth/login` | `/api/v1/auth/login` | 用户登录 |
| `/auth/logout` | `/api/v1/auth/logout` | 用户登出 |
| `/auth/refresh` | `/api/v1/auth/refresh` | 刷新令牌 |
| `/auth/codes` | `/api/v1/auth/user-info` | 用户权限 |
| `/user/info` | `/api/v1/auth/user-info` | 用户信息 |
| `/menu/all` | `/api/v1/menu/user-tree` | 用户菜单 |

## 🚀 启动说明

### 1. 启动后端服务
```bash
cd mind-core
# 启动 MySQL 和 Redis
docker-compose -f docker-compose.dev.yml up -d mysql redis

# 启动后端应用
mvn spring-boot:run -pl speromind-server
```

### 2. 启动前端服务
```bash
cd spero-ui/apps/web-antd
pnpm dev
```

### 3. 访问应用
- 前端地址: http://localhost:5173
- 后端地址: http://localhost:8080
- API文档: http://localhost:8080/doc.html

## 🔐 默认账号

| 用户名 | 密码 | 角色 | 说明 |
|--------|------|------|------|
| admin | admin123 | 超级管理员 | 默认管理员账号 |

## 🧪 测试验证

### 1. 登录测试
1. 访问 http://localhost:5173
2. 输入用户名: `admin`
3. 输入密码: `admin123`
4. 输入验证码（点击图片可刷新）
5. 点击登录

### 2. 功能测试
- ✅ 用户登录/登出
- ✅ 令牌刷新
- ✅ 用户信息获取
- ✅ 菜单权限加载
- ✅ 用户管理CRUD
- ✅ 角色管理CRUD
- ✅ 菜单管理CRUD

## ⚠️ 注意事项

### 1. 环境要求
- Node.js 18+
- Java 21+
- MySQL 8.0+
- Redis 6.0+

### 2. 端口配置
- 前端开发服务器: 5173
- 后端应用服务器: 8080
- MySQL: 3306
- Redis: 6379

### 3. 跨域处理
Vite 代理已配置跨域，无需额外配置。

### 4. 验证码
验证码图片由后端生成，前端通过 `/api/v1/auth/captcha` 获取。

## 🐛 常见问题

### 1. 登录失败
- 检查后端服务是否启动
- 检查验证码是否正确
- 查看浏览器控制台错误信息

### 2. 菜单不显示
- 检查用户权限配置
- 确认菜单数据格式正确

### 3. API 404 错误
- 检查 Vite 代理配置
- 确认后端接口路径正确

## 📝 后续开发

### 1. 添加新接口
1. 在 `src/api/system/` 下创建对应模块
2. 定义 TypeScript 接口类型
3. 实现API调用函数

### 2. 错误处理
- 统一错误提示已配置
- 可根据业务需求定制错误处理逻辑

### 3. 权限控制
- 前端路由守卫已集成
- 按钮权限可通过 `permCodes` 控制

---

**替换完成！** 🎉

前端已完全对接 SperoMind 后端，可以开始进行功能测试和业务开发。
