# Tasks: 文档编辑器 AI 对话侧边栏与布局联动 (doc-editor-ai-sidebar)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 准备前端模块基础路径与导出定义

- [x] T001 确认模块目录结构并在 frontend/src/widgets/ai-sidebar 中准备模块定义与导出文件 frontend/src/widgets/ai-sidebar/index.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 布局状态拓展，支撑全局 AI 侧边栏控制与目录隐显联动

- [x] T002 拓展 LayoutProvider 布局状态，在 frontend/src/app/providers/LayoutProvider.tsx 中新增 isAiSidebarOpen、toggleAiSidebar 状态及目录联动逻辑

---

## Phase 3: User Story 1 - 打开/关闭 AI 对话侧边栏与目录互斥逻辑 (Priority: P1) 🎯 MVP

**Goal**: 实现顶部 Header 操作区消息通知右侧的 AI 按钮，点击唤起侧边栏并隐藏目录 Icon；关闭侧边栏时重新显示目录 Icon

**Independent Test**: 在文档编辑页，点击 Header 的 AI 图标按钮，侧边栏展开且目录 Icon 自动隐藏；再次点击或关闭侧边栏，侧边栏收起且目录 Icon 重新显现

### Implementation for User Story 1

- [x] T003 [P] [US1] 在 frontend/src/widgets/header/ui/Header.tsx 消息通知图标右侧新增样式对齐的 AI 图标按钮，绑定 toggleAiSidebar
- [x] T004 [US1] 在 frontend/src/pages/kb-home/ui/KbEditorViewport.tsx 中接入 isAiSidebarOpen 状态，当 AI 侧边栏展开时条件隐藏目录 Icon，关闭时恢复展示

**Checkpoint**: 顶部 AI 按钮控制侧边栏开关与目录 Icon 显显隐互斥逻辑完全独立运作

---

## Phase 4: User Story 2 - 文档编辑器内容区向左平移与响应式留白调整 (Priority: P1)

**Goal**: 当 AI 对话侧边栏展开时，驱动文档编辑器正文容器向左平移 340px，减少多余留白，关闭时恢复居中

**Independent Test**: 观察 AI 侧边栏展开与关闭时，编辑器正文区域是否平滑向左移动缩进与复原，正文内容无截断重叠

### Implementation for User Story 2

- [x] T005 [US2] 在 frontend/src/pages/kb-home/ui/KbEditorViewport.tsx 中为其内容容器添加 340px 动态偏移（marginRight / paddingRight）与 transition 过渡动画，响应 isAiSidebarOpen 状态

**Checkpoint**: 编辑器内容区平滑向左平移，留白适配 340px 侧边栏空间

---

## Phase 5: User Story 3 - 插件面板与 AI 侧边栏的统一布局展示 (Priority: P2)

**Goal**: 构建与 PluginDrawer 容器布局、标题栏及样式完全一致的 AI 侧边栏面板组件，并集成到 WorkspaceLayout

**Independent Test**: 打开 AI 侧边栏，观察其外框尺寸 (340px)、边框、关闭按钮及内部 AI 对话交互，确认视觉规范与既有插件面板统一

### Implementation for User Story 3

- [x] T006 [P] [US3] 创建 AI 对话逻辑 Hook frontend/src/widgets/ai-sidebar/model/useAiChat.ts，管理对话消息列表与输入框状态
- [x] T007 [P] [US3] 创建对话气泡渲染组件 frontend/src/widgets/ai-sidebar/ui/AiMessageItem.tsx
- [x] T008 [US3] 创建 340px 宽度的 AI 侧边栏面板组件 frontend/src/widgets/ai-sidebar/ui/AiSidebarDrawer.tsx，包含顶部 Title、关闭 Icon、消息列表与 Prompt 输入框
- [x] T009 [US3] 在 frontend/src/app/layout/WorkspaceLayout.tsx 中装配 AiSidebarDrawer，并将 Header 的 onToggleAi 和 isAiActive 绑定至 LayoutProvider

**Checkpoint**: 所有 User Story 功能完备，AI 侧边栏面板具备完整视觉规范与对话交互

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 全局构建与手动验证

- [x] T010 按照 specs/004-doc-editor-ai-sidebar/quickstart.md 执行端到端手动验证流程，确保无界面报错或样式异常
- [x] T011 执行前端类型检查与打包验证 frontend 代码

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 无依赖
- **Foundational (Phase 2)**: 依赖 Phase 1，阻塞所有 User Stories
- **User Story 1 (Phase 3)**: 依赖 Phase 2
- **User Story 2 (Phase 4)**: 依赖 Phase 3（状态共享）
- **User Story 3 (Phase 5)**: 可与 Phase 4 并行，依赖 Phase 2 状态
- **Polish (Phase 6)**: 依赖 Phase 3, 4, 5 全部完成

### Parallel Opportunities

- T003 [P] [US1] 与 T006 [P] [US3] / T007 [P] [US3] 可以并行开发（独立组件与 Hook）

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. 完成 Phase 1 & 2：建立基石 LayoutContext 状态
2. 完成 Phase 3 & 4：验证顶部 Header AI 按钮、目录显隐互斥以及编辑器容器向左平移
3. 验证 MVP 核心体验

### Incremental Delivery

1. 完成 MVP 布局与联动逻辑
2. 集成 Phase 5 的完整 AI 侧边栏对话面板
3. 执行 Quickstart 快速上手验证
