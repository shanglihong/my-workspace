# Phase 0 Research: 前端系统总布局规划

**Feature Branch**: `001-frontend-main-layout`
**Date**: 2026-08-16
**Spec**: [spec.md](spec.md)

## Key Technical Decisions & Research

### Decision 1: 布局整体设计架构与组件拆分 (FSD Architecture)

- **Decision**: 采用 Feature-Sliced Design (FSD) 范式进行布局架构拆分：
  - `widgets/Header`: 顶部全局操作栏组件（Logo、动态面包屑、搜索、创建按钮、阅读/编辑状态、个人中心）。
  - `widgets/Sidebar`: 极简侧边栏组件（包含常用入口导航、可折叠知识库目录树 `TreeNavigation`、底部系统状态与一键收起按钮）。
  - `widgets/MainWorkspace`: 中央主工作区容器（统一卡片头部 Header + 内容自适应 Canvas，动态装载 `DocEditor` 或 `Draw.io` / 模版列表）。
  - `widgets/OutlineDrawer`: 右侧长文档悬浮目录大纲侧边面板。
  - `features/layout-toggle`: 控制侧边栏折叠/展开与 LocalStorage 持久化逻辑。
  - `entities/navigation`: 导航树节点模型与路径状态管理。
- **Rationale**: 遵循分层依赖与高内聚原则，布局组件与逻辑解耦，便于后续扩展新的应用组件和视图类型。
- **Alternatives Considered**: 
  - 将整个布局放在单一 `App.tsx` 中：代码过于臃肿，不符合 KISS 及模块化拆分规范。
  - 使用第三方现成 Dashboard 模版：样式过于通用，无法精准实现飞书云文档风格的微交互与简洁调性。

### Decision 2: 状态管理与上下文传递 (Layout Context)

- **Decision**: 在 `shared/context` 或 `app/providers` 中创建 `LayoutContext`，提供全局状态：
  - `isSidebarCollapsed: boolean`: 侧边栏折叠状态。
  - `activeNodeId: string`: 当前选中的知识库节点 ID。
  - `breadcrumbPath: NavNode[]`: 计算得出的完整面包屑路径。
  - `theme: 'light' | 'dark'`: 视觉主题状态。
- **Rationale**: 利用 React Context 无缝向下传递布局状态，免去繁琐的层层 Prop Drilling，同时支持 LocalStorage 状态持久化。
- **Alternatives Considered**: 
  - Redux/Zustand: 对于当前布局控制状态，标准 React Context 配合轻量 Hook 即可满足需求，保持 KISS 原则。

### Decision 3: 视觉设计系统与样式实现 (CSS Specification)

- **Decision**: 采用原生 CSS Variables（设计令牌 Design Tokens）+ 极简浅色/深色主题规范：
  - 主背景色：`#F8F9FA` (浅色) / `#0F172A` (深色)
  - 侧边栏背景：`#F4F5F7` (浅色) / `#1E293B` (深色)
  - 卡片与工作区背景：`#FFFFFF` (浅色) / `#1E293B` (深色)
  - 边框与分割线：`#E5E6EB` (浅色) / `#334155` (深色)
  - 交互悬浮态：`#EBF1FF` (浅色) / `#334155` (深色)
  - 文字颜色：`#1D2129` (主文本), `#86909C` (次级文本)
- **Rationale**: 低饱和度配色呈现云文档极致简洁高质感，符合视觉指导方针与 Constitution 要求。

### Decision 4: 极简侧边栏折叠与平滑过渡动画

- **Decision**: 侧边栏宽度在展开态设为 `260px`，收起态平滑过渡至 `64px` 极简图标模式；内容区（Main Content）使用 CSS `flex: 1` 自动拓展，结合 `transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1)` 保证 60fps 高帧率无闪烁过渡。
- **Rationale**: 保证在大屏与小屏切换时提供极其顺畅的视觉体验。
