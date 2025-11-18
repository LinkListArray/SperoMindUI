# Git 远程仓库配置指南

## 🎯 目标
将 SperoMind 前端项目推送到您自己的 Git 仓库进行托管

## 📋 前置条件
- ✅ 已清理 Vben 原始 git 历史
- ✅ 已初始化新的 git 仓库
- ✅ 已完成初始提交

## 🛠️ 配置步骤

### 1. 创建远程仓库
在您的 Git 托管平台（GitHub/GitLab/Gitee 等）创建新仓库：

**仓库名称建议**: `spero-ui` 或 `speromind-frontend`
**描述**: SperoMind 前端管理系统 - 基于 Vue 3 + TypeScript + Ant Design Vue

### 2. 配置远程仓库地址

#### 方式一：使用 HTTPS
```bash
cd /Users/wanglu/projects/SperoMind/spero-ui
git remote add origin https://github.com/your-username/spero-ui.git
```

#### 方式二：使用 SSH（推荐）
```bash
cd /Users/wanglu/projects/SperoMind/spero-ui
git remote add origin git@github.com:your-username/spero-ui.git
```

### 3. 推送到远程仓库

#### 如果使用 main 分支：
```bash
# 重命名默认分支为 main
git branch -m main

# 推送到远程仓库
git push -u origin main
```

#### 如果使用 master 分支：
```bash
# 直接推送
git push -u origin master
```

### 4. 验证配置
```bash
# 查看远程仓库
git remote -v

# 查看分支状态
git branch -a

# 查看提交历史
git log --oneline --graph
```

## 🔄 后续开发流程

### 日常开发
```bash
# 拉取最新代码
git pull origin main

# 创建功能分支
git checkout -b feature/new-feature

# 提交更改
git add .
git commit -m "feat: 添加新功能"

# 推送分支
git push origin feature/new-feature
```

### 合并到主分支
```bash
# 切换到主分支
git checkout main

# 合并功能分支
git merge feature/new-feature

# 推送主分支
git push origin main
```

## 📝 推荐的 Git 配置

### 全局配置
```bash
# 设置用户名
git config --global user.name "Your Name"

# 设置邮箱
git config --global user.email "your.email@example.com"

# 设置默认分支名
git config --global init.defaultBranch main

# 设置默认编辑器
git config --global core.editor "code --wait"
```

### 项目级配置
```bash
# 设置项目特定的忽略文件
echo "*.log" >> .gitignore
echo "coverage/" >> .gitignore

# 设置项目特定的分支策略
git config branch.main.rebase true
```

## 🏷️ 标签管理

### 创建版本标签
```bash
# 创建轻量标签
git tag v1.0.0

# 创建带注释的标签
git tag -a v1.0.0 -m "SperoMind 前端 v1.0.0 版本"

# 推送标签到远程
git push origin v1.0.0
```

### 查看标签
```bash
# 查看所有标签
git tag -l

# 查看标签详情
git show v1.0.0
```

## 🔧 团队协作

### 分支策略建议
```
main              # 主分支，生产环境代码
develop           # 开发分支，集成最新功能
feature/*         # 功能分支
hotfix/*          # 热修复分支
release/*         # 发布分支
```

### 提交信息规范
```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建过程或辅助工具的变动
```

## 🚨 注意事项

1. **不要提交敏感信息**：
   - API 密钥
   - 数据库密码
   - 个人配置文件

2. **定期备份**：
   ```bash
   # 创建备份分支
   git branch backup-$(date +%Y%m%d)
   ```

3. **保持仓库整洁**：
   ```bash
   # 清理未跟踪的文件
   git clean -fd
   
   # 压缩历史记录
   git gc --aggressive
   ```

## 📞 获取帮助

如果遇到问题，可以：
1. 查看项目文档：`README_SPERO.md`
2. 检查 Git 状态：`git status`
3. 查看提交历史：`git log --oneline --graph`
4. 重置到安全状态：`git reset --hard HEAD~1`

---

**恭喜！您现在拥有完全独立的 SperoMind 前端 Git 仓库！** 🎉
