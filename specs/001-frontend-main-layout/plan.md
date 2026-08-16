# Implementation Plan: 前端系统总布局规划

**Branch**: `001-frontend-main-layout` | **Date**: 2026-08-16 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-frontend-main-layout/spec.md`

## Summary

参考飞书云文档风格规划并实现前端系统极简总布局（Header、Sidebar、Main Workspace 三栏联动结构）。
严格遵循 Feature-Sliced Design (FSD) 规范（参见 [.agents/rules/fsd.md](../../.agents/rules/fsd.md)），拆分顶栏控件、可折叠知识库导航树侧边栏与统一主工作区卡片容器，实现流畅的面包屑联动、侧边栏平滑折叠、主题切换以及 `my-doc-editor` 与 `Draw.io` 等不同视图的无缝自适应接入。

## Technical Context

**Language/Version**: TypeScript 5.x / React 18
**Primary Dependencies**: React, Vite, my-doc-editor
**Storage**: LocalStorage (持久化布局偏好与侧边栏折叠状态)
**Testing**: Vitest / React Testing Library
**Target Platform**: Desktop Web Browsers (Chrome, Edge, Safari) / Responsive Mobile Viewport
**Project Type**: Web Application (Strict FSD Architecture)
**Performance Goals**: 60fps 动画平滑度，侧边栏折叠无卡顿，节点切换延迟 < 100ms
**Constraints**: 极致简洁视觉风格（浅灰/暗黑低饱和调性），遵从 FSD 依赖流与 Public API 规范

## Constitution & FSD Gate Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **I. KISS 原则与架构完整性**: FSD 规范拆分为 7 个分层（`app` -> `pages` -> `widgets` -> `features` -> `entities` -> `shared` -> `mock`）。
- [x] **II. 单向依赖原则**: 严禁跨层向上依赖。外部仅能通过 Slice 根部 `index.ts`（Public API）导入，使用 `@/` 路径别名。
- [x] **III. Segment 标准结构**: 每一个 Slice 按照 `ui/`, `model/`, `api/`, `lib/` 进行 Segment 拆分。
- [x] **IV. 用户体验一致性**: 统一配色设计令牌（Design Tokens），提供侧边栏平滑折叠动画、完整加载/空状态与无缝主题切换。

## Project Structure (FSD Compliant)

### Documentation (this feature)

```text
specs/001-frontend-main-layout/
├── plan.md              # 本文件
├── research.md          # Phase 0 架构与技术决策
├── data-model.md        # Phase 1 实体与状态模型定义
├── quickstart.md        # Phase 1 验证指导规范
└── contracts/           # Phase 1 组件契约定义
    └── layout-contracts.md
```

### Source Code (frontend/src/ Directory)

```text
frontend/src/
├── app/
│   ├── App.tsx                        # 应用主视图入口
│   └── providers/
│       └── LayoutProvider.tsx         # 全局 Layout Context
├── pages/
│   └── workspace/
│       ├── ui/
│       │   └── WorkspacePage.tsx      # 工作空间主页面 Slice
│       └── index.ts                   # Page Public API
├── widgets/
│   ├── header/
│   │   ├── ui/
│   │   │   └── Header.tsx             # 顶栏部件
│   │   └── index.ts                   # Widget Public API
│   ├── sidebar/
│   │   ├── ui/
│   │   │   ├── Sidebar.tsx            # 侧边栏部件
│   │   │   └── TreeNavigation.tsx     # 知识库目录树
│   │   └── index.ts                   # Widget Public API
│   └── main-workspace/
│       ├── ui/
│       │   └── MainWorkspace.tsx      # 主工作区部件
│       └── index.ts                   # Widget Public API
├── features/
│   ├── layout-toggle/
│   │   ├── model/
│   │   │   └── useLayoutToggle.ts     # 侧边栏折叠与持久化 Feature
│   │   └── index.ts                   # Feature Public API
│   └── theme-switch/
│       ├── model/
│       │   └── useTheme.ts            # 主题切换 Feature
│       └── index.ts                   # Feature Public API
├── entities/
│   └── navigation/
│       ├── model/
│       │   ├── types.ts               # NavNode 等领域接口
│       │   └── navigationModel.ts     # 导航状态与面包屑计算
│       └── index.ts                   # Entity Public API
├── shared/
│   ├── ui/                            # 通用 UI 组件 (Button, Tooltip, Icon等)
│   ├── styles/                        # 设计令牌与全局 CSS
│   └── lib/                           # Utils 帮助函数
└── mock/
    └── navigationData.ts              # 演示数据
```

**Structure Decision**: 完全遵循 `.agents/rules/fsd.md` 规范。所有层级间保持单向依赖，跨 Slice 引用严格限制在各 Slice 的 `index.ts`。

## Phase 0 & Phase 1 Artifacts Summary

- **Phase 0 Research**: [research.md](research.md)
- **Phase 1 Data Model**: [data-model.md](data-model.md)
- **Phase 1 Contracts**: [contracts/layout-contracts.md](contracts/layout-contracts.md)
- **Phase 1 Quickstart**: [quickstart.md](quickstart.md)
