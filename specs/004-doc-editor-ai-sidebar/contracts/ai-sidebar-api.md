# UI Contract & Props Specification: doc-editor-ai-sidebar

## 前端组件 Props 契约

### 1. Header 组件 Props 扩充
[frontend/src/widgets/header/ui/Header.tsx](../../frontend/src/widgets/header/ui/Header.tsx)

```typescript
export interface HeaderProps {
  className?: string;
  isPluginActive?: boolean;
  onTogglePlugin?: () => void;
  // 新增 AI 侧边栏 Props 绑定
  isAiActive?: boolean;
  onToggleAi?: () => void;
}
```

### 2. AiSidebarDrawer 组件 Props
`frontend/src/widgets/ai-sidebar/ui/AiSidebarDrawer.tsx`

```typescript
export interface AiSidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeDocTitle?: string;
  activeDocContent?: string;
}
```

### 3. Header Action AI 按钮样式契约
- 容器结构: `div`
- 宽 x 高: `30px` x `28px`
- 边框: `isAiActive ? '1.5px solid #8b5cf6' : '1px solid rgba(139, 92, 246, 0.35)'`
- 背景色: `isAiActive ? 'rgba(139, 92, 246, 0.18)' : 'rgba(139, 92, 246, 0.1)'`
- 图标: `<Icon name="sparkles" size={14} color="#8b5cf6" />`
