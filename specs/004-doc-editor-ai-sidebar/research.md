# Research: 文档编辑器 AI 对话侧边栏与布局联动 (doc-editor-ai-sidebar)

## 架构与布局调研结论

### 1. Header 处 AI 按钮的视觉与交互方案
- **决策**: 在 `Header.tsx` 中的消息通知图标右侧增加 AI Icon 按钮。
- **样式规范**: 保持与消息通知按钮（`HeaderNotificationsPopover` 触发器）完全相同的尺寸 (`30px x 28px`)、圆角 (`var(--radius-sm)`)、过渡动画以及点击状态反馈。
- **图标选择**: 使用 SVG `sparkles` 闪烁星光图标代表 AI 辅助功能，配备极具辨识度的渐变或专有微亮底色（如 `rgba(147, 51, 234, 0.12)` 与紫色/蓝靛色边框）。

### 2. AI 对话侧边栏组件设计
- **决策**: 在 `frontend/src/widgets/ai-sidebar` 中新建 `AiSidebarDrawer` 组件。
- **布局参考**: 完全对齐 `PluginDrawer` 的样式规范（宽度 `340px`，`height: 100vh`，`borderLeft: 1px solid var(--border-color)`，带顶部标题栏与关闭 Icon 按钮）。
- **内部体验**: 提供标准 AI 对话上下文面板，包括快捷 Prompt 指令（如“总结当前文档”、“文档润色”、“扩写段落”）与输入框。

### 3. 编辑器内容区左移与留白缩减机制
- **决策**: 在 `KbEditorViewport` 中引入 `isAiSidebarOpen` 响应。
- **平移动画与布局**: 当 AI 侧边栏展开时，将编辑器外层视口设置 `marginRight: 340px` 或调整内容区容器 padding/max-width，配合 `transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1)`，使编辑器正文平滑向左移动，缩减多余留白。

### 4. 目录 Icon 显隐与状态联动
- **决策**: 在 `LayoutProvider` 中新增 `isAiSidebarOpen` 与 `toggleAiSidebar` 状态。
- **互斥规则**: 当 AI 侧边栏打开时，目录 Icon (`Icon name="outline"`) 与目录面板自动隐藏（`display: none` / 条件渲染）；当 AI 侧边栏关闭时，目录 Icon 恢复可见。
