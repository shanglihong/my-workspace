# FSD 前端编程与架构指南

本指南基于 Feature-Sliced Design (FSD) 架构规范，用于指导 frontend/ 目录下的前端开发与代码组织。

## 一、 代码目录层级

代码根据 FSD 规范拆分为以下 7 个主要层级（从上到下）：

1. **app**：应用程序入口与全局配置。包含全局 Provider、路由初始化、全局样式导入、Store 激活等。
2. **pages**：页面级视图层。负责将 widgets 和 features 组合为具体的业务页面。
3. **widgets**：独立的大块 UI 复合组件。将实体、功能与基础 UI 组合为具有完整业务上下文的 UI 区块（如 Header、Sidebar、ProductListGrid）。
4. **features**：用户可交互的具体功能单元。实现能够为用户带来直接价值的交互行为（如 AuthLogin、FilterProducts、ToggleTheme）。
5. **entities**：业务实体层。定义领域相关的模型、接口、数据处理逻辑与实体专用 UI（如 User, Product, Order）。
6. **shared**：底层共享基础设施。包含通用 UI-kit 组件、网络请求封装（API Client）、帮助函数（Utils）、全局常量与类型定义。
7. **mock**：Mock 数据与接口模拟服务。用于本地开发与测试的虚拟数据拦截与模拟。

## 二、 层级依赖约束 (单向依赖原则)

FSD 的核心原则是**严格单向依赖**：上层可以依赖下层，下层绝对禁止依赖上层。

依赖流动方向：
`app` -> `pages` -> `widgets` -> `features` -> `entities` -> `shared`

具体规则：
- **shared**：底层通用层，不能依赖上面任何层级（app, pages, widgets, features, entities, mock）。
- **entities**：可以依赖 shared，但不能依赖 features, widgets, pages, app。实体之间（Cross-entity）禁止相互依赖。
- **features**：可以依赖 entities 和 shared，但不能依赖 widgets, pages, app。
- **widgets**：可以依赖 features, entities 和 shared，但不能依赖 pages, app。
- **pages**：可以依赖 widgets, features, entities 和 shared，不能依赖 app。
- **app**：作为顶层组合层，可以依赖下方所有层级。
- **mock**：仅作为开发测试辅助，禁止在生产环境代码中被硬编码依赖。

## 三、 Slice 与 Segment 结构

在 `pages`, `widgets`, `features`, `entities` 层级内部，代码采用切片 (Slice) 与段落 (Segment) 进行二次划分：

1. **Slice (切片)**：按具体业务领域划分的子目录（例如 `entities/user`, `features/auth-login`）。
2. **Segment (段落)**：切片内部按代码性质划分的子文件夹：
   - `ui/`：React UI 组件与样式
   - `model/`：状态管理、Hooks、类型声明与数据流
   - `api/`：与后端交互的 API 请求函数与 DTO
   - `lib/`：切片内部专用的辅助工具函数

## 四、 Public API 导出规范

每一个 Slice（切片）必须通过根部的 `index.ts`（即 Public API）显式对外暴露可访问的接口与组件。

- **隐蔽内部实现**：外部层级只能从 `index.ts` 导入该 Slice 的内容，严禁跨切片直接引用内部深层文件（如禁止 `import { UserCard } from '@/entities/user/ui/UserCard'`，必须使用 `import { UserCard } from '@/entities/user'`）。
- **绝对路径别名**：项目中统一使用 `@/` 指向 `src/` 目录，保证引用的清晰与规范。

## 五、 开发实践与质量要求

1. **高内聚低耦合**：业务逻辑应优先收拢在对应的 `features` 或 `entities` 中，避免在 `pages` 中编写过多的状态处理逻辑。
2. **状态防污染**：全局状态仅在 `app` 层通过 Context/Provider 注入，组件级状态收拢在对应的 Segment `model` 中。
3. **无障碍与样式一致性**：`shared/ui` 存放统一的设计系统组件，禁止在各切片中随意覆盖基础组件的核心交互样式。
