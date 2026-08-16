# Frontend Feature-Sliced Design (FSD) Architecture

本项目前端采用 **Feature-Sliced Design (FSD)** 分层架构与 Vite + React + TypeScript 技术栈。

## 目录结构说明

前端所有核心代码统一放置于 `src/` 目录下，划分为 7 个核心层级：

```text
frontend/
├── src/
│   ├── app/          # 应用程序入口、全局 Provider、路由与全局样式
│   ├── pages/        # 页面级视图层（组合 widgets 和 features）
│   ├── widgets/      # 复合 UI 大块组件（如 Header, Sidebar, Card Grids）
│   ├── features/     # 用户可交互的功能单元（如 AuthLogin, ThemeToggle）
│   ├── entities/     # 业务实体层（如 User, Product 的 Model/UI/API）
│   ├── shared/       # 底层共享基础设施（UI-kit, API Client, Utils, Types）
│   ├── mock/         # Mock 数据与虚拟接口服务
│   ├── main.tsx      # 应用渲染主入口
│   ├── index.css     # 全局基础设施样式
│   └── vite-env.d.ts # Vite 环境类型定义
├── index.html        # HTML 页面模板
├── package.json      # 依赖与脚本配置
├── tsconfig.json     # TypeScript 配置（包含 `@/` 路径别名）
├── vite.config.ts    # Vite 构建配置
└── README.md
```

## 单向依赖规则

项目严格执行单向依赖约束，依赖只能从上层流向下层：

`app` → `pages` → `widgets` → `features` → `entities` → `shared`

详细的 FSD 层级隔离、Segment 划分及 Public API (`index.ts`) 导出规范请参考项目规则文档 [.agents/rules/fsd.md](file://../.agents/rules/fsd.md)。
