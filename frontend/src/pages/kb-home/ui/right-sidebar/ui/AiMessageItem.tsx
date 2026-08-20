import React from 'react';
import { Icon } from '@/shared/ui';
import { AiMessage } from '../model/useAiChat';

export interface AiMessageItemProps {
  message: AiMessage;
}

export const AiMessageItem: React.FC<AiMessageItemProps> = ({ message }) => {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '16px',
        }}
      >
        {/* 用户消息：日间100%保持原版深黑胶囊卡片(#262626 + #ffffff)，夜间模式完美自适应 */}
        <div
          style={{
            maxWidth: '84%',
            padding: '10px 16px',
            borderRadius: '18px 18px 4px 18px',
            backgroundColor: 'var(--user-bubble-bg)', // 日间: #262626, 夜间: #f1f5f9
            color: 'var(--user-bubble-text)',       // 日间: #ffffff, 夜间: #131926
            fontSize: '14px',
            lineHeight: '1.6',
            wordBreak: 'break-word',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  // AI 消息：日间100%保持原版 #1f1f1f 墨黑字与 #8c8c8c 思考链小字
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: '20px',
      }}
    >
      {/* 顶端思维/意图流转小字 */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '11px',
          color: 'var(--text-muted)', // 日间: #8c8c8c
          marginBottom: '8px',
          cursor: 'pointer',
        }}
      >
        <span>识别用户核心提问意图</span>
        <Icon name="chevron-right" size={11} color="var(--text-muted)" />
      </div>

      {/* AI 消息正文 */}
      <div
        style={{
          width: '100%',
          fontSize: '14px',
          lineHeight: '1.65',
          color: 'var(--text-primary)', // 日间: #1f1f1f
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {message.content}
      </div>
    </div>
  );
};
