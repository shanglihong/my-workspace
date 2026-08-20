# Implementation Plan: 文档编辑器 AI 对话侧边栏与布局联动 (doc-editor-ai-sidebar)

**Branch**: `004-doc-editor-ai-sidebar` | **Date**: 2026-08-20 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from [specs/004-doc-editor-ai-sidebar/spec.md](./spec.md)

## Summary

在文档编辑 Head 区域消息通知按钮右侧新增 AI 图标按钮（风格与消息通知按钮一致），点击后可展开 340px 宽度的右侧 AI 对话侧边栏（外观与插件抽屉一致）。AI 侧边栏展开时，自动隐藏目录图标，并驱动文本编辑器容器向左平移，减少视口留白；AI 侧边栏关闭时，编辑器恢复居中留白布局，目录图标重新显现。

## Technical Context

**Language/Version**: React 18, TypeScript 5.x, Vite, Vanilla CSS Modules / CSS Variables  
**Primary Dependencies**: React, Lucide/Custom Icons, React Context API  
**Storage**: N/A (本地组件与 Context 页面级状态)  
**Testing**: Vitest / React Testing Library, Manual Layout Verification  
**Target Platform**: Modern Web Browsers (Desktop 1280px+)  
**Project Type**: Frontend Single-Page Web Application (`frontend/`)  
**Performance Goals**: AI 侧边栏切换与编辑器视口平移过度动画响应时间 < 200ms  
**Constraints**: 前端约束仅允许读写 `frontend/` 目录；无 Emoji 图标；相对路径引用  
**Scale/Scope**: 涉及 `LayoutProvider`, `Header`, `KbEditorViewport`, `WorkspaceLayout` 及新增 `AiSidebarDrawer` 模块  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **简洁与可维护性 (KISS 原则)**: 通过在 LayoutProvider 中统一管理侧边栏显隐与布局偏移量，不引入额外的复杂状态管理库，符合 KISS 原则。
- **界面与交互规范一致**: AI 按钮直接沿用 `HeaderNotificationsPopover` 的样式尺寸 (`30px x 28px`)；AI 侧边栏完全复用 `PluginDrawer` 的 340px 容器与 Header 规范。
- **响应式与微交互**: 利用 CSS CSS Variables 与 smooth transition (`cubic-bezier(0.4, 0, 0.2, 1)`) 实现平滑的编辑器左移及留白收缩。
- **前端权限约束遵守**: 所有修改集中于 `frontend/src/` 内部，绝对不越权触碰 `backend/` 目录。

## Project Structure

### Documentation (this feature)

```text
specs/004-doc-editor-ai-sidebar/
├── plan.md              # 本计划文档
├── research.md          # 调研与方案决策
├── data-model.md        # 状态与数据结构定义
├── quickstart.md        # 快速上手与验证指南
└── contracts/
    └── ai-sidebar-api.md # 前端组件接口与样式契约
```

### Source Code Layout

```text
frontend/src/
├── app/
│   ├── layout/
│   │   └── WorkspaceLayout.tsx         # 全局布局装配与 AI 侧边栏渲染
│   └── providers/
│       └── LayoutProvider.tsx          # 扩展 isAiSidebarOpen 与 toggleAiSidebar 状态
├── widgets/
│   ├── header/
│   │   └── ui/
│   │       └── Header.tsx              # 新增消息通知按钮右侧的 AI 图标按钮
│   ├── ai-sidebar/
│   │   ├── index.ts
│   │   ├── model/
│   │   │   └── useAiChat.ts            # AI 对话交互逻辑 Hook
│   │   └── ui/
│   │       ├── AiSidebarDrawer.tsx     # 340px 右侧侧边栏组件
│   │       └── AiMessageItem.tsx       # AI 对话气泡组件
│   └── plugin-drawer/
│       └── ui/PluginDrawer.tsx
└── pages/
    └── kb-home/
        └── ui/
            └── KbEditorViewport.tsx    # 响应 isAiSidebarOpen 实现编辑器向左平移与目录图标显隐
```

**Structure Decision**: 选定基于现有的 FSD (Feature-Sliced Design) 模块化架构。新增 `widgets/ai-sidebar` 处理侧边栏面板，修改 `widgets/header` 添加触发按钮，修改 `app/providers/LayoutProvider.tsx` 与 `pages/kb-home/ui/KbEditorViewport.tsx` 实现跨组件状态共享与布局平移联动。

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 无违反项 | 本设计直接复用现有组件库与 Context 状态机制 | N/A |
