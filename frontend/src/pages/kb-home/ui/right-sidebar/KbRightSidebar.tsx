import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@/shared/ui';
import { useLayout } from '@/app/providers/LayoutProvider';
import { useAiChat } from './model/useAiChat';
import { AiMessageItem } from './ui/AiMessageItem';
import { PluginContent } from './ui/PluginContent';

export const KbRightSidebar: React.FC = () => {
  const { activeNode, rightDrawerType, closeRightDrawer } = useLayout();
  const sidebarRef = useRef<HTMLElement | null>(null);

  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    sendMessage,
    selectedModel,
    setSelectedModel,
    availableModels,
  } = useAiChat(activeNode?.title);

  const [showModelMenu, setShowModelMenu] = useState<boolean>(false);

  // 点击全页面任意其他地方，自动平滑收缩侧边栏
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rightDrawerType) return;

      const target = event.target as HTMLElement;

      // 点击发生在侧边栏内部，不触发收缩
      if (sidebarRef.current && sidebarRef.current.contains(target)) {
        return;
      }

      // 点击的是 Header 上的插件/AI 触发按钮，不二次解绑
      if (target.closest('[data-drawer-trigger="true"]')) {
        return;
      }

      // 点击全页面任意其他地方，自动触发平滑收缩关闭
      closeRightDrawer();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [rightDrawerType, closeRightDrawer]);

  const isOpen = rightDrawerType !== null;
  const isAiMode = rightDrawerType === 'ai';

  return (
    <aside
      ref={sidebarRef}
      style={{
        width: isOpen ? '340px' : '0px',
        opacity: isOpen ? 1 : 0,
        height: '100%',
        backgroundColor: 'var(--bg-sidebar)', // 日间: #fafafa 原版底色, 夜间: #0d111a
        borderLeft: isOpen ? '1px solid var(--border-color)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
        flexShrink: 0,
        zIndex: 5,
        overflow: 'hidden',
        boxShadow: isOpen ? 'var(--shadow-sm)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* 内部固定 340px 宽度的弹性展开/收缩容器 */}
      <div style={{ width: '340px', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {isAiMode ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
            {/* AI 模式内容区 */}
            <div
              style={{
                flex: 1,
                padding: '16px 16px 12px 16px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {messages.length === 0 ? (
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    textAlign: 'center',
                  }}
                >
                  <h2
                    style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      color: 'var(--text-primary)', // 日间: #1f1f1f
                      margin: 0,
                      letterSpacing: '-0.2px',
                    }}
                  >
                    有什么我能帮你的吗？
                  </h2>
                </div>
              ) : (
                messages.map(msg => <AiMessageItem key={msg.id} message={msg} />)
              )}

              {isLoading && (
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic', padding: '6px' }}>
                  AI 正在思考中...
                </div>
              )}
            </div>

            {/* AI 模式底部大圆角 Input 框（日间100%保持原版 #ffffff 精细卡片配色，夜间模式精准覆盖适配） */}
            <div
              style={{
                padding: '0 12px 14px 12px',
                flexShrink: 0,
                position: 'relative',
              }}
            >
              {/* 模型选择器 Popup 浮窗 */}
              {showModelMenu && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '80px',
                    left: '16px',
                    width: '200px',
                    backgroundColor: 'var(--bg-card)', // 日间: #ffffff
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    boxShadow: 'var(--shadow-md)',
                    padding: '4px',
                    zIndex: 20,
                  }}
                >
                  {availableModels.map(model => (
                    <div
                      key={model}
                      onClick={() => {
                        setSelectedModel(model);
                        setShowModelMenu(false);
                      }}
                      style={{
                        padding: '7px 10px',
                        fontSize: '12px',
                        fontWeight: selectedModel === model ? 600 : 400,
                        color: selectedModel === model ? 'var(--text-primary)' : 'var(--text-secondary)',
                        backgroundColor: selectedModel === model ? 'var(--bg-hover)' : 'transparent',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'var(--transition-smooth)',
                      }}
                    >
                      <span>{model}</span>
                      {selectedModel === model && <Icon name="check" size={12} color="var(--text-primary)" />}
                    </div>
                  ))}
                </div>
              )}

              {/* 大圆角悬浮 Card 外框 */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card)', // 日间: #ffffff, 夜间: #131926
                  border: '1px solid var(--border-color)',
                  borderRadius: '20px',
                  padding: '12px 14px 10px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                {/* 第一行：输入文本框 */}
                <input
                  type="text"
                  placeholder="发消息或使用 / 选择技能"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    fontSize: '14px',
                    color: 'var(--text-primary)', // 日间: #1f1f1f
                  }}
                />

                {/* 第二行：底层工具栏 */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* + 加号 */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer',
                        color: 'var(--text-primary)',
                        fontSize: '16px',
                        fontWeight: 500,
                      }}
                    >
                      +
                    </div>

                    {/* 垂直分割线 | */}
                    <div style={{ width: '1px', height: '12px', backgroundColor: 'var(--border-color)' }} />

                    {/* 模型选择胶囊 */}
                    <div
                      onClick={() => setShowModelMenu(!showModelMenu)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '4px 10px',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: 'var(--text-primary)', // 日间: #1f1f1f
                        backgroundColor: 'var(--bg-hover)', // 日间: #f3f4f6
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)',
                      }}
                    >
                      <Icon name="sparkles" size={12} color="var(--text-primary)" />
                      <span>{selectedModel}</span>
                      <Icon name="chevron-right" size={10} color="var(--text-muted)" />
                    </div>

                    {/* ... 更多 */}
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', cursor: 'pointer', padding: '0 2px' }}>
                      ...
                    </div>
                  </div>

                  {/* 右侧：圆形 ↑ 发送按钮 */}
                  <button
                    onClick={() => sendMessage()}
                    disabled={!inputValue.trim()}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: inputValue.trim() ? 'var(--text-primary)' : 'var(--bg-hover)', // 日间: #1f1f1f / #f3f4f6
                      color: inputValue.trim() ? 'var(--bg-card)' : 'var(--text-muted)', // 日间: #ffffff / #9ca3af
                      border: 'none',
                      cursor: inputValue.trim() ? 'pointer' : 'default',
                      transition: 'var(--transition-smooth)',
                    }}
                  >
                    <Icon name="arrow-up" size={14} color="currentColor" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* 插件模式内容 */
          <PluginContent />
        )}
      </div>
    </aside>
  );
};
