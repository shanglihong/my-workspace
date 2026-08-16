import React, { useRef, useState } from 'react';
import { DocEditor, type DocEditorRef } from 'my-doc-editor';
import 'my-doc-editor/dist/my-doc-editor.css';
import { AppProvider } from './providers/AppProvider';

const initialContent = `# DocEditor 演示文档

这是一个基于 **my-doc-editor** 组件构建的在线文档编辑器 Demo。

## 核心特性列表

- **Markdown 兼容**：支持快速输入与实时双向转换。
- **画图集成**：内置 draw.io 流程图/架构图在线绘制能力。
- **丰富块级元素**：支持标题、列表、代码高亮、表格、引用等。
- **暗黑/浅色主题**：支持受控主题动态无缝切换。

\`\`\`typescript
// 代码高亮示例
function greet(name: string): string {
  return \`Hello, \${name}! Welcome to DocEditor.\`;
}
console.log(greet('Developer'));
\`\`\`

> 提示：尝试输入 "/" 唤起快捷功能菜单，或点击上方菜单体验丰富的交互效果。
`;

export const App: React.FC = () => {
  const editorRef = useRef<DocEditorRef>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [markdownOutput, setMarkdownOutput] = useState<string>(initialContent);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  return (
    <AppProvider>
      <div style={{ minHeight: '100vh', backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc', color: theme === 'dark' ? '#f8fafc' : '#0f172a', transition: 'background-color 0.3s' }}>
        {/* 顶栏操作区 */}
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', borderBottom: theme === 'dark' ? '1px solid #1e293b' : '1px solid #e2e8f0', backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>DocEditor 组件效果演示</h2>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
              style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: theme === 'dark' ? '#334155' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#334155', cursor: 'pointer' }}
            >
              当前主题: {theme === 'light' ? '浅色 (Light)' : '深色 (Dark)'}
            </button>
            <button
              onClick={() => setShowPreview(v => !v)}
              style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', backgroundColor: '#3b82f6', color: '#ffffff', cursor: 'pointer', fontWeight: 500 }}
            >
              {showPreview ? '隐藏 Markdown 实时数据' : '查看 Markdown 实时数据'}
            </button>
          </div>
        </header>

        {/* 主内容区 */}
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px', display: 'flex', gap: '24px' }}>
          {/* 编辑器卡片区 */}
          <div style={{ flex: 1, backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', minHeight: '600px' }}>
            <DocEditor
              ref={editorRef}
              value={initialContent}
              theme={theme}
              drawioUrl="/drawio/index.html"
              onChange={(_docNode: any, markdown: string) => {
                setMarkdownOutput(markdown);
              }}
            />
          </div>

          {/* 实时 Markdown 输出预览侧边栏 */}
          {showPreview && (
            <div style={{ width: '400px', backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '16px', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginTop: 0, fontSize: '14px', borderBottom: '1px solid #cbd5e1', paddingBottom: '8px' }}>实时 Markdown 数据源</h3>
              <textarea
                readOnly
                value={markdownOutput}
                style={{ flex: 1, width: '100%', fontFamily: 'monospace', fontSize: '12px', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: theme === 'dark' ? '#0f172a' : '#f1f5f9', color: theme === 'dark' ? '#e2e8f0' : '#334155', resize: 'none' }}
              />
            </div>
          )}
        </main>
      </div>
    </AppProvider>
  );
};

