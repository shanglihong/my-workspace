import { useState, useCallback } from 'react';

export interface AiMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export function useAiChat(docTitle?: string) {
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>('工作任务 Turbo');

  const availableModels = [
    '工作任务 Turbo',
    'DeepSeek V3 深度推理',
    'Claude 3.5 Sonnet 创作',
    'GPT-4o 逻辑引擎',
  ];

  const sendMessage = useCallback((textToSend?: string) => {
    const prompt = (textToSend || inputValue).trim();
    if (!prompt) return;

    const userMsg: AiMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      let aiResponseText = `我是你的 AI 助手，可以帮你处理各种任务，比如：\n• 文档处理：创建、编辑、阅读知识库文档 / Word / Excel / PPT\n• 内容创作：写文章、报告、文案、脚本\n• 信息检索：搜索资料、查数据、做调研\n• 数据分析：处理表格、做统计和可视化\n• 多媒体生成：生成图片、矢量图表\n• 代码与技术：写代码、调试、解决技术问题`;

      if (prompt.includes('总结') || prompt.includes('摘要')) {
        aiResponseText = `【${selectedModel} 核心摘要】\n针对当前文档《${docTitle || '新文档'}》：\n• 核心要点 1：文档编辑器与 AI 侧边栏完美一体化平移\n• 核心要点 2：支持大圆角卡片式极简 AI 输入框与模型选择\n• 核心要点 3：无框透明融入式 AI 消息渲染与思维流程链展示`;
      } else if (prompt.includes('润色') || prompt.includes('优化')) {
        aiResponseText = `【${selectedModel} 润色结果】\n已对当前选中文本进行表达流畅度与结构化升级，优化了段落层级与主谓语衔接。`;
      }

      const aiMsg: AiMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: aiResponseText,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 600);
  }, [inputValue, docTitle, selectedModel]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    sendMessage,
    clearMessages,
    selectedModel,
    setSelectedModel,
    availableModels,
  };
}
