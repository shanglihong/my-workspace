# Data Model & Interface Contracts: 前端 Widgets 模块架构重构 (widgets-refactor)

## 1. 组件 Props 与接口定义 (Component Contracts)

### ContentViewportProps

```typescript
export interface ContentViewportProps {
  className?: string;
}
```
*职责*: 纯粹的工作区内容编辑器渲染视口。负责根据当前活动节点 `activeNode` 的类型（`chart` / `doc`），渲染对应的 Draw.io 矢量图表或 DocEditor Markdown 编辑器。不再承担页面分发职责。

### HeaderProps

```typescript
export interface HeaderProps {
  className?: string;
  isPluginActive?: boolean;
  onTogglePlugin?: () => void;
}
```
*职责*: 头部状态栏与导航面包屑展示，控制插件抽屉开关与通知展示。

### SidebarProps

```typescript
export interface SidebarProps {
  className?: string;
}
```
*职责*: 工作区左侧一级与二级导航栏组合组件。

### SidebarIconButtonProps

```typescript
export interface SidebarIconButtonProps {
  icon: IconName;
  tooltip: string;
  onClick?: () => void;
  className?: string;
}
```
*职责*: 侧边栏底部独立工具按钮子组件（解耦日夜切换、回收站、设置按钮）。

---

## 2. 页面视图路由与渲染分发模型 (View Routing Model)

在 `pages/workspace/ui/WorkspacePage.tsx` 中承接 `activeView` 分发：

| Active View | 渲染组件 | 归属层级 | 说明 |
| :--- | :--- | :--- | :--- |
| `home` | `<GlobalHomePage />` | `pages/global-home` | 系统首页 |
| `kb-home` | `<KbHomePage />` | `pages/kb-home` | 知识库空间首页 |
| `tasks` | `<TasksPage />` | `pages/tasks` | 计划任务管理 |
| `toolbox` | `<ToolboxPage />` | `pages/toolbox` | 生产力工具箱 |
| `drive` | `<CloudDrivePage />` | `pages/cloud-drive` | 云端存储与同步 |
| `editor` / 其他 | `<ContentViewport />` | `widgets/content-viewport` | 节点文档/图表编辑视口 |
