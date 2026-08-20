# Research: 前端 Widgets 模块架构重构 (widgets-refactor)

## 架构重构与组件解耦决策

### 1. 解耦 ContentViewport 对 Pages 层的反向依赖

- **Decision**: 将 `activeView` 的主页面分发逻辑移入 `pages/workspace/ui/WorkspacePage.tsx`。`ContentViewport` 组件专用于渲染工作区编辑视图（包括 `DocEditor` 富文本编辑器与 Draw.io 画布 iframe），完全剥离对 `pages/*` 下各页面组件的导入。
- **Rationale**: 遵循 Feature-Sliced Design (FSD) 的单向依赖准则。Widgets 层处于 Pages 层下方，绝不能直接引用 Pages 层的组件。页面分发应属于页面级 (Pages) 或路由级 (App) 的职责。
- **Alternatives Considered**:
  - *方案 A*: 维持在 Widgets 层，使用 React children / 插槽模式传入页面组件。但 `ContentViewport` 名称与功能强绑定工作区编辑器，包装非编辑器页面（如全局首页、任务页）在语义上不合理。
  - *方案 B*: 将 `ContentViewport` 整体移至 `pages/workspace` 目录下。但这会导致组件缺失 Widgets 层级的独立性，不如直接清理依赖、保留为纯粹的编辑器视口 Widget。

### 2. 清理废弃与空白组件目录

- **Decision**: 彻底移除 `frontend/src/widgets/mainWorkspace` 目录与 `frontend/src/widgets/sidebar/model` 目录。
- **Rationale**: 经全盘代码扫描，上述目录内部均为空白，没有任何代码文件或导出，属于遗留冗余目录，清理可提升代码库简洁度（KISS 原则）。

### 3. 规范 Widgets 层 Public API 入口

- **Decision**: 重新编写 `frontend/src/widgets/index.ts`，显式统一导出 Widgets 层的公共组件（`Header`, `Sidebar`, `ContentViewport`, `PluginDrawer`）及其对应的 Props 类型，精细化暴露 Public API。
- **Rationale**: 遵循 FSD 规范中每个 Layer/Slice 必须具备显式索引导出点（Public API Index）的要求。

### 4. 侧边栏底部重复工具按钮抽象

- **Decision**: 在 `frontend/src/widgets/sidebar/ui` 下提取 `SidebarIconButton.tsx` 子组件，封装 Tooltip、Hover 样式与点击事件。
- **Rationale**: 侧边栏底部的“日夜模式”、“回收站”、“设置”图标按钮逻辑与样式存在 100% 重复拷贝，提炼可遵循 DRY 原则并提升组件维护性。
