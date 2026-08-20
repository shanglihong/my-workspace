# Tasks: 前端 Widgets 模块架构重构 (widgets-refactor)

**Feature**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 初始化与基建准备

- [x] T001 确认前端服务构建命令与代码仓库结构在 `frontend/` 下正常运行

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 阻断性工程清理与环境准入

- [x] T002 清理并删除废弃空目录 `frontend/src/widgets/mainWorkspace` 及 `frontend/src/widgets/sidebar/model`

---

## Phase 3: User Story 1 - 保持工作区页面与视口无缝渲染 (Priority: P1) 🎯 MVP

**Goal**: 解耦 `ContentViewport` 对 `pages` 层的依赖，将主视图分发收拢至 `WorkspacePage.tsx`，保持页面无缝渲染

**Independent Test**: 运行开发服务器并切换各主视图（首页、知识库、任务、工具箱、云盘、编辑器），确认渲染均正常

### Implementation for User Story 1

- [x] T003 [US1] 在 [WorkspacePage.tsx](frontend/src/pages/workspace/ui/WorkspacePage.tsx) 中引入 `GlobalHomePage`, `KbHomePage`, `TasksPage`, `ToolboxPage`, `CloudDrivePage` 并实现 `activeView` 主视图路由分发逻辑
- [x] T004 [US1] 移除 [ContentViewport.tsx](frontend/src/widgets/content-viewport/ui/ContentViewport.tsx) 对 `pages/*` 的逆向导入，重构为纯粹的文档与架构图编辑器渲染视口
- [x] T005 [US1] 验证 `ContentViewport` 与 `WorkspacePage` 协作良好，文档加载与保存机制运行正常

---

## Phase 4: User Story 2 - 清理废弃结构与规范模块公共 API 导出 (Priority: P2)

**Goal**: 建立清晰规范的 Widgets 层 Public API 入口

**Independent Test**: 检查 `frontend/src/widgets/index.ts` 暴露点，确认所有组件统一导出正常

### Implementation for User Story 2

- [x] T006 [US2] 重新编写 [widgets/index.ts](frontend/src/widgets/index.ts)，精细化导出 `Header`, `Sidebar`, `ContentViewport`, `PluginDrawer` 的组件与类型定义
- [x] T007 [US2] 检查各 widget 子模块 index 导出，确保私有实现不外泄

---

## Phase 5: User Story 3 - 界面解耦与样式/UI组件抽象 (Priority: P3)

**Goal**: 抽象 `SidebarIconButton` 消除侧边栏重复样式与 DOM 逻辑

**Independent Test**: 检查侧边栏底部按钮悬浮与日夜模式切换功能是否正常

### Implementation for User Story 3

- [x] T008 [P] [US3] 创建 [SidebarIconButton.tsx](frontend/src/widgets/sidebar/ui/SidebarIconButton.tsx) 统一图标按钮组件
- [x] T009 [US3] 在 [Sidebar.tsx](frontend/src/widgets/sidebar/ui/Sidebar.tsx) 中替换使用 `SidebarIconButton` 简练表达底部日夜切换、回收站与设置按钮

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 验证与编译检查

- [x] T010 [P] 运行 `cd frontend && npm run build` 确保 TypeScript 类型与生产打包干净无报错
- [x] T011 [P] 运行 [quickstart.md](quickstart.md) 中验证场景确认功能完整无退化
