# Feature Specification: 前端 Widgets 模块架构重构 (widgets-refactor)

**Feature Branch**: `003-widgets-refactor`

**Created**: 2026-08-20

**Status**: Draft

**Input**: User description: "进行代码的重构，不要影响功能"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 保持工作区页面与视口无缝渲染 (Priority: P1)

作为开发者和系统用户，在重构前端 Widgets 架构后，访问工作台、侧边栏导航、知识库、计划任务管理、工具箱和云盘管理时，页面功能和视觉表现应与重构前完全一致，且重构消除 Widgets 层对 Pages 层的逆向依赖。

**Why this priority**: 重构的首要原则是保证现有功能无回归（Non-breaking），同时恢复 FSD 架构分层的纯洁性。

**Independent Test**: 在各页面（工作台、知识库、任务、工具箱、云盘）间自由切换，验证导航、面包屑、文档编辑器（DocEditor与DrawIO）正常加载，且侧边栏与插件抽屉均能正常开关。

**Acceptance Scenarios**:

1. **Given** 用户处于系统工作区，**When** 点击侧边栏不同导航项（主页、知识库、任务、工具箱、云盘），**Then** 内容视口按预期正确切换对应视图，主界面与面包屑无异常崩溃。
2. **Given** 用户在工作区选择具体的文档或图表节点，**When** Viewport 渲染节点内容时，**Then** 正确显示富文本编辑器或 Draw.io 矢量画布，修改内容后保存机制依然可用。

---

### User Story 2 - 清理废弃结构与规范模块公共 API 导出 (Priority: P2)

作为开发者，系统应清理多余的废弃空目录（如 mainWorkspace 等），并建立规范的 Widgets 根入口与子模块 index 导出定义，提升代码库的简洁度与维护体验。

**Why this priority**: 遵循 KISS 原则与代码质量规范，消除代码库噪音，降低后续开发人员的认知负载。

**Independent Test**: 检查 Widgets 层文件目录结构，确认不再包含废弃的空组件目录，且导入组件均通过统一规范的相对路径或 Index API 进行引入。

**Acceptance Scenarios**:

1. **Given** 源码仓库目录结构，**When** 检查 `frontend/src/widgets` 目录时，**Then** 废弃的 `mainWorkspace` 及无用子目录已被彻底清理。
2. **Given** 业务代码需要使用 Header、Sidebar 或 PluginDrawer 等部件，**When** 通过 Widget 模块接口导入时，**Then** 导出关系清晰规范，不存在暴露内部私有实现的情况。

---

### User Story 3 - 界面解耦与样式/UI组件抽象 (Priority: P3)

作为开发者，Sidebar 等组件内部的重复图标按钮与复杂内联样式应被合理提取为子组件和结构化样式，使布局代码更易扩展与维护。

**Why this priority**: 减少重复代码（DRY），提高组件内聚性与可读性。

**Independent Test**: 检查侧边栏底部工具图标（模式切换、回收站、设置），悬浮与点击响应逻辑正常，且代码中使用统一抽离的工具按钮组件。

**Acceptance Scenarios**:

1. **Given** 用户交互侧边栏底部工具图标，**When** 鼠标悬浮或点击日夜模式切换时，**Then** 依然能流畅响应主题切换与提示框展示。

---

### Edge Cases

- 当从非编辑器视图快速切换至编辑器视图时，活动节点与编辑器状态是否会出现同步滞后或残留？
- 当外部插件抽屉处于打开状态时，进行主页面切换或窗口调整，抽屉样式与关闭响应是否不受影响？

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 重构后的系统 MUST 保持既有所有前端页面逻辑、样式展示和交互响应完全一致，无功能性退化。
- **FR-002**: Widgets 层组件（如 `content-viewport`）MUST 消除对 `pages` 层的硬编码依赖，遵守单向依赖架构规范。
- **FR-003**: 系统的主内容分发机制 MUST 移至 `pages` 或路由管理层，确保 Widgets 专注 UI 板块渲染。
- **FR-004**: 源码库 MUST 清理无用的遗留空目录（如 `frontend/src/widgets/mainWorkspace` 及 `frontend/src/widgets/sidebar/model`）。
- **FR-005**: Widgets 各子模块与根目录 MUST 提供符合 FSD 规范的精细化 Public API 导出。

### Key Entities *(include if feature involves data)*

- **Navigation Node (NavNode)**: 标识侧边栏与知识库的层级节点数据结构，包含节点 ID、标题、节点类型（doc/chart/folder）与子节点列表。
- **Active View State**: 控制工作区当前活动视图模式（home/kb-home/tasks/toolbox/drive/editor）的状态契约。

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 重构后所有自动化编译构建（`npm run build` 或 `npm run dev`）100% 干净通过，无 TypeScript 或打包错误。
- **SC-002**: 消除 100% 针对 Widgets 层下层依赖上层（`widgets` -> `pages`）的反向依赖。
- **SC-003**: 清理掉所有 0 行代码的垃圾废弃 Widget 目录。
- **SC-004**: 重构后，现有所有 6 个主视图逻辑交互功能与视觉样式在体验测试中通过率达到 100%。

## Assumptions

- 重构范围限定在前端 `frontend/src/widgets` 及相关上层调用点，不改变后端接口或底层 API 契约。
- 现有全局 Provider（如 LayoutProvider）的数据流动结构保持兼容，避免引发大范围侵入式修改。
