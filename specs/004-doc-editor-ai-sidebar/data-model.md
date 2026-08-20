# Data Model & State Definition: doc-editor-ai-sidebar

## 领域实体与状态契约

### 1. Header & Layout 侧边栏布局状态 (LayoutContextState)

在 `frontend/src/app/providers/LayoutProvider.tsx` 中扩展的状态类型与字段：

```typescript
export interface LayoutContextValue {
  // 现有状态...
  isSidebarCollapsed: boolean;
  activeView: ActiveView;

  // 新增 AI 侧边栏与目录联动状态
  isAiSidebarOpen: boolean;
  toggleAiSidebar: () => void;
  setAiSidebarOpen: (open: boolean) => void;
  
  // 目录显隐控制
  isOutlineOpen: boolean;
  isOutlineIconVisible: boolean; // 当 AI 侧边栏打开时为 false，关闭时为 true
  toggleOutline: () => void;
}
```

### 2. AI 对话消息实体 (AiMessage)

在 `frontend/src/widgets/ai-sidebar/model/types.ts` 中定义的实体类型：

```typescript
export type AiMessageRole = 'user' | 'assistant' | 'system';

export interface AiMessage {
  id: string;
  role: AiMessageRole;
  content: string;
  timestamp: number;
  status?: 'sending' | 'success' | 'error';
}

export interface AiSidebarState {
  isOpen: boolean;
  messages: AiMessage[];
  isLoading: boolean;
  inputValue: string;
}
```

### 3. 编辑器布局适配实体 (EditorViewportLayout)

在 `KbEditorViewport` 中所计算的响应式样式实体：

```typescript
export interface EditorViewportLayoutProps {
  isAiSidebarOpen: boolean;
  editorMarginRight: number; // 当 isAiSidebarOpen 为 true 时为 340px，否则为 0
  isCatalogVisible: boolean;  // 当 isAiSidebarOpen 为 true 时为 false，否则根据 isOutlineOpen 决定
}
```
