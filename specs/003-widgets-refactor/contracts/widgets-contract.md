# Widgets Contract Definition: widgets-refactor

## 模块 Public API 导出契约

`frontend/src/widgets/index.ts` 暴露契约规则：

```typescript
// Header Widget
export { Header } from './header';
export type { HeaderProps } from './header';

// Sidebar Widget
export { Sidebar } from './sidebar';
export type { SidebarProps } from './sidebar';

// Content Viewport Widget
export { ContentViewport } from './content-viewport';
export type { ContentViewportProps } from './content-viewport';

// Plugin Drawer Widget
export { PluginDrawer } from './plugin-drawer';
export type { PluginDrawerProps } from './plugin-drawer';
```

## 层级约束契约 (Layering Rule)

1. `widgets` 层禁止导入任何 `pages/*` 下的导出。
2. 页面级别的分发路由必须封装在 `pages` 层（如 `pages/workspace`）或 `app` 路由层。
3. `widgets` 内部子组件必须只使用相对路径或者标准的引用导入。
