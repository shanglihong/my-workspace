# Implementation Plan: 前端 Widgets 模块架构重构 (widgets-refactor)

**Branch**: `003-widgets-refactor` | **Date**: 2026-08-20 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from [spec.md](spec.md)

## Summary

重构前端 `frontend/src/widgets` 目录下的组件架构。重点解决 `content-viewport` 对 `pages` 层的逆向依赖违规，将页面分发逻辑移至 `pages/workspace`；清理 `mainWorkspace` 等废弃空目录；规范 Widgets 统一 Public API 导出；并解耦 Sidebar 底部工具按钮组件。重构全过程确保现有 6 个主视图及编辑器功能无任何破坏与退化。

## Technical Context

**Language/Version**: TypeScript 5.x, React 18.x

**Primary Dependencies**: Vite, React, my-doc-editor

**Storage**: Local Browser State / Provider Context (LayoutProvider)

**Testing**: React Testing / Manual Verification / Vite Build Validation

**Target Platform**: Modern Web Browsers (Desktop)

**Project Type**: Web Application Frontend

**Performance Goals**: 页面与视口无缝切换，无额外 UI 重绘延迟

**Constraints**: 遵循 Feature-Sliced Design (FSD) 单向依赖规范，绝对禁止 `widgets` 层依赖 `pages` 层

**Scale/Scope**: `frontend/src/widgets/` 下 4 个核心 Widgets 组件（Header, Sidebar, ContentViewport, PluginDrawer）及 `pages/workspace`

## Constitution Check

*GATE: Passed. All architectural refactoring decisions comply strictly with the project constitution.*

1. **简洁与可维护性 (KISS 原则)**: 移除空白废弃目录 `mainWorkspace`，将冗余的内联逻辑解耦拆分，降低技术债务。
2. **分层依赖与高内聚**: 彻底清除 `widgets` 层对 `pages` 层的上行依赖，恢复 FSD 规范的单向依赖。
3. **功能一致性与不改变行为**: 重构属于纯粹的结构性优化，保证所有用户交互、视图切换与编辑器功能完全兼容无退化。

## Project Structure

### Documentation (this feature)

```text
specs/003-widgets-refactor/
├── plan.md              # 本实施计划文档
├── research.md          # 架构决策与解耦方案研究
├── data-model.md        # 组件接口规范与视图路由模型
├── quickstart.md        # 验证指导与测试步骤
└── contracts/           # 模块导出与分层约束契约
    └── widgets-contract.md
```

### Source Code (repository root)

```text
frontend/
└── src/
    ├── pages/
    │   └── workspace/
    │       └── ui/
    │           └── WorkspacePage.tsx      # 承接 activeView 主页面分发渲染
    └── widgets/
        ├── index.ts                       # 精细化暴露 Widgets Public API
        ├── content-viewport/
        │   ├── index.ts
        │   └── ui/
        │       └── ContentViewport.tsx    # 纯粹的工作区文档/图表编辑器视口
        ├── header/
        │   ├── index.ts
        │   └── ui/
        │       ├── Header.tsx
        │       └── Breadcrumb.tsx
        ├── plugin-drawer/
        │   ├── index.ts
        │   └── ui/
        │       └── PluginDrawer.tsx
        └── sidebar/
            ├── index.ts
            └── ui/
                ├── Sidebar.tsx            # 使用 SidebarIconButton 解耦底部工具栏
                ├── SidebarIconButton.tsx  # 抽离的底部工具图标按钮小件
                └── TreeNavigation.tsx
```

**Structure Decision**: 采用前端应用 FSD (Feature-Sliced Design) 标准目录结构，在 `frontend/src/widgets/` 下维护独立模块，并彻底移除原 `mainWorkspace` 及 `sidebar/model` 废弃空目录。

## Complexity Tracking

> 无章程冲突事项。
