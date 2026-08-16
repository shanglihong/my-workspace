# Interface Contracts: 前端系统总布局契约 (FSD 规范)

**Feature Branch**: `001-frontend-main-layout`
**Date**: 2026-08-16
**Spec**: [spec.md](../spec.md)
**Rule Reference**: [.agents/rules/fsd.md](../../../.agents/rules/fsd.md)

## FSD Layer Public API Contracts

严格遵循 FSD 单向依赖原则：`app` -> `pages` -> `widgets` -> `features` -> `entities` -> `shared`。
所有 Slice 必须通过根目录 `index.ts` 对外暴露接口，禁止深层目录文件强耦合引用。

---

### 1. Entity Public API (`@/entities/navigation`)

导出导航树领域模型与面包屑计算逻辑。

```typescript
// frontend/src/entities/navigation/index.ts
export type { NavNode, NodeType, BreadcrumbItem } from './model/types';
export { calculateBreadcrumbPath } from './model/navigationModel';
```

---

### 2. Feature Public APIs

#### 2.1 `@/features/layout-toggle`
控制侧边栏折叠与 LocalStorage 持久化。

```typescript
// frontend/src/features/layout-toggle/index.ts
export { useLayoutToggle } from './model/useLayoutToggle';
```

#### 2.2 `@/features/theme-switch`
控制浅色/深色主题。

```typescript
// frontend/src/features/theme-switch/index.ts
export { useTheme } from './model/useTheme';
```

---

### 3. Widget Public APIs

#### 3.1 Header Widget (`@/widgets/header`)
```typescript
// frontend/src/widgets/header/index.ts
export { Header } from './ui/Header';
export type { HeaderProps } from './ui/Header';
```

#### 3.2 Sidebar Widget (`@/widgets/sidebar`)
```typescript
// frontend/src/widgets/sidebar/index.ts
export { Sidebar } from './ui/Sidebar';
export type { SidebarProps } from './ui/Sidebar';
```

#### 3.3 MainWorkspace Widget (`@/widgets/main-workspace`)
```typescript
// frontend/src/widgets/main-workspace/index.ts
export { MainWorkspace } from './ui/MainWorkspace';
export type { MainWorkspaceProps } from './ui/MainWorkspace';
```

---

### 4. Page Public API (`@/pages/workspace`)

```typescript
// frontend/src/pages/workspace/index.ts
export { WorkspacePage } from './ui/WorkspacePage';
```
