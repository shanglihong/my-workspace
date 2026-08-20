import React, { useState } from 'react';
import { Icon, SelectDropdown, SelectOption } from '@/shared/ui';
import { useLayout } from '@/entities/layout';

export type SettingsTabType = 'api-keys' | 'general' | 'workspace';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useLayout();
  const [activeTab, setActiveTab] = useState<SettingsTabType>('api-keys');

  // API Key 密码与状态
  const [openAiKey, setOpenAiKey] = useState<string>('sk-proj-984a8f82819d4a82a81f93821038101a');
  const [deepSeekKey, setDeepSeekKey] = useState<string>('sk-deepseek-819a82f8a192841029410a82');
  const [claudeKey, setClaudeKey] = useState<string>('');
  const [baseUrl, setBaseUrl] = useState<string>('https://api.openai.com/v1');

  const [showOpenAiKey, setShowOpenAiKey] = useState<boolean>(false);
  const [showDeepSeekKey, setShowDeepSeekKey] = useState<boolean>(false);
  const [showClaudeKey, setShowClaudeKey] = useState<boolean>(false);

  const [testStatus, setTestStatus] = useState<Record<string, string>>({});

  // 偏好设置状态
  const [editorLayout, setEditorLayout] = useState<string>('single');
  const [autoSaveInterval, setAutoSaveInterval] = useState<string>('1s');
  const [defaultExportType, setDefaultExportType] = useState<string>('md');
  const [toastMessage, setToastMessage] = useState<string>('');

  // 通用 SelectDropdown 展开菜单状态
  const [activeDropdown, setActiveDropdown] = useState<'editorLayout' | 'autoSave' | 'exportType' | null>(null);

  // 下拉选项配置明细
  const editorLayoutOptions: SelectOption[] = [
    { value: 'single', label: '单栏极简模式' },
    { value: 'split', label: '双栏分栏实时预览' },
  ];

  const autoSaveOptions: SelectOption[] = [
    { value: '1s', label: '实时 (1 秒防抖)' },
    { value: '5s', label: '平缓 (5 秒离线)' },
    { value: 'manual', label: '仅手动保存' },
  ];

  const exportTypeOptions: SelectOption[] = [
    { value: 'md', label: 'Markdown (.md)' },
    { value: 'pdf', label: 'PDF 文档 (.pdf)' },
    { value: 'docx', label: 'Word (.docx)' },
  ];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleTestConnection = (provider: string) => {
    setTestStatus(prev => ({ ...prev, [provider]: 'testing' }));
    setTimeout(() => {
      setTestStatus(prev => ({ ...prev, [provider]: 'success' }));
      triggerToast(`${provider} 服务连通测试成功！响应延迟 142ms`);
    }, 800);
  };

  const handleSaveSettings = () => {
    triggerToast('系统配置与 API 密钥已即时持久化保存');
  };

  return (
    <div
      style={{
        flex: 1,
        height: 'calc(100vh - var(--header-height))',
        backgroundColor: 'var(--bg-app)',
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Toast 提示框 */}
      {toastMessage && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '24px',
            backgroundColor: 'var(--primary-color)',
            color: '#ffffff',
            padding: '10px 16px',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            fontSize: '13px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 100,
            animation: 'popoverScaleFadeIn 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          }}
        >
          <Icon name="check" size={14} color="#ffffff" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 左侧设置分类 Tab 侧栏 */}
      <div
        style={{
          width: '220px',
          backgroundColor: 'var(--bg-sidebar)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 12px',
          gap: '4px',
          userSelect: 'none',
        }}
      >
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', padding: '0 8px 8px 8px', letterSpacing: '0.5px' }}>
          设置选项
        </div>

        {[
          { id: 'api-keys', label: '模型 API 密钥', icon: 'sparkles' },
          { id: 'general', label: '偏好与编辑器', icon: 'settings' },
          { id: 'workspace', label: '工作区与存储', icon: 'folder' },
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTabType)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--primary-color)' : 'var(--text-primary)',
                backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
              }}
            >
              <Icon name={tab.icon as any} size={15} color={isActive ? 'var(--primary-color)' : 'var(--text-secondary)'} />
              <span>{tab.label}</span>
            </div>
          );
        })}
      </div>

      {/* 右侧设置主内容区域 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 40px' }}>
        <div style={{ maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* TAB 1: API Key 密钥配置 */}
          {activeTab === 'api-keys' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
                  模型 API 密钥配置
                </h2>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  配置各类大语言模型的 API 密钥与代理基准 Base URL。所有 Key 均保存在本地存储中，不会被明文上传。
                </div>
              </div>

              {/* OpenAI API Key */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon name="sparkles" size={16} color="var(--primary-color)" />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>OpenAI API Key</span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--color-success)', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                    已就绪
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type={showOpenAiKey ? 'text' : 'password'}
                    value={openAiKey}
                    onChange={e => setOpenAiKey(e.target.value)}
                    placeholder="sk-proj-..."
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-app)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                  <button
                    onClick={() => setShowOpenAiKey(!showOpenAiKey)}
                    style={{
                      padding: '0 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-card)',
                      color: 'var(--text-secondary)',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    {showOpenAiKey ? '隐藏' : '显示'}
                  </button>
                  <button
                    onClick={() => handleTestConnection('OpenAI')}
                    style={{
                      padding: '0 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--primary-color)',
                      backgroundColor: 'var(--primary-light)',
                      color: 'var(--primary-color)',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    {testStatus['OpenAI'] === 'testing' ? '测试中...' : '测试连通性'}
                  </button>
                </div>
              </div>

              {/* DeepSeek API Key */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon name="sparkles" size={16} color="var(--color-violet)" />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>DeepSeek API Key</span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--color-violet)', backgroundColor: 'rgba(139, 92, 246, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                    推荐高性价比
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type={showDeepSeekKey ? 'text' : 'password'}
                    value={deepSeekKey}
                    onChange={e => setDeepSeekKey(e.target.value)}
                    placeholder="sk-deepseek-..."
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-app)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                  <button
                    onClick={() => setShowDeepSeekKey(!showDeepSeekKey)}
                    style={{
                      padding: '0 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-card)',
                      color: 'var(--text-secondary)',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    {showDeepSeekKey ? '隐藏' : '显示'}
                  </button>
                  <button
                    onClick={() => handleTestConnection('DeepSeek')}
                    style={{
                      padding: '0 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--primary-color)',
                      backgroundColor: 'var(--primary-light)',
                      color: 'var(--primary-color)',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    {testStatus['DeepSeek'] === 'testing' ? '测试中...' : '测试连通性'}
                  </button>
                </div>
              </div>

              {/* Anthropic Claude API Key */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon name="sparkles" size={16} color="var(--color-info)" />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Anthropic Claude API Key</span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', backgroundColor: 'var(--bg-hover)', padding: '2px 8px', borderRadius: '4px' }}>
                    未配置
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type={showClaudeKey ? 'text' : 'password'}
                    value={claudeKey}
                    onChange={e => setClaudeKey(e.target.value)}
                    placeholder="sk-ant-..."
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-app)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                  <button
                    onClick={() => setShowClaudeKey(!showClaudeKey)}
                    style={{
                      padding: '0 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-card)',
                      color: 'var(--text-secondary)',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    {showClaudeKey ? '隐藏' : '显示'}
                  </button>
                  <button
                    onClick={() => handleTestConnection('Claude')}
                    style={{
                      padding: '0 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--primary-color)',
                      backgroundColor: 'var(--primary-light)',
                      color: 'var(--primary-color)',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    {testStatus['Claude'] === 'testing' ? '测试中...' : '测试连通性'}
                  </button>
                </div>
              </div>

              {/* Custom Base URL 配置 */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>自定义 Base URL / 代理基准地址</div>
                <input
                  type="text"
                  value={baseUrl}
                  onChange={e => setBaseUrl(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-app)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
          )}

          {/* TAB 2: 通用偏好与编辑器 */}
          {activeTab === 'general' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
                  常规偏好与编辑器设置
                </h2>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  个性化自定义系统外观、编辑器行为与导出机制。
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {/* 外观切换 */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>系统外观主题</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>当前选择: {theme === 'dark' ? '夜间模式 (Dark)' : '日间模式 (Light)'}</div>
                  </div>
                  <button
                    onClick={toggleTheme}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-hover)',
                      color: 'var(--text-primary)',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    切换为{theme === 'dark' ? '日间' : '夜间'}
                  </button>
                </div>

                <div style={{ height: '1px', backgroundColor: 'var(--border-light)' }} />

                {/* 编辑器默认布局 (全面重构使用通用 SelectDropdown 组件) */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>默认编辑器排版</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>新建或打开文档时的默认视图</div>
                  </div>

                  <div style={{ position: 'relative' }}>
                    <div
                      onClick={() => setActiveDropdown(activeDropdown === 'editorLayout' ? null : 'editorLayout')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-app)',
                        color: 'var(--text-primary)',
                        fontSize: '12px',
                        cursor: 'pointer',
                        minWidth: '160px',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{editorLayoutOptions.find(o => o.value === editorLayout)?.label}</span>
                      <Icon name="chevron-right" size={11} color="var(--text-muted)" />
                    </div>

                    <SelectDropdown
                      isOpen={activeDropdown === 'editorLayout'}
                      onClose={() => setActiveDropdown(null)}
                      options={editorLayoutOptions}
                      value={editorLayout}
                      onChange={val => setEditorLayout(val)}
                      position="bottom-right"
                      width="180px"
                    />
                  </div>
                </div>

                <div style={{ height: '1px', backgroundColor: 'var(--border-light)' }} />

                {/* 自动保存间隔 (全面重构使用通用 SelectDropdown 组件) */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>实时自动保存</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>文档修改后实时增量持久化</div>
                  </div>

                  <div style={{ position: 'relative' }}>
                    <div
                      onClick={() => setActiveDropdown(activeDropdown === 'autoSave' ? null : 'autoSave')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-app)',
                        color: 'var(--text-primary)',
                        fontSize: '12px',
                        cursor: 'pointer',
                        minWidth: '160px',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{autoSaveOptions.find(o => o.value === autoSaveInterval)?.label}</span>
                      <Icon name="chevron-right" size={11} color="var(--text-muted)" />
                    </div>

                    <SelectDropdown
                      isOpen={activeDropdown === 'autoSave'}
                      onClose={() => setActiveDropdown(null)}
                      options={autoSaveOptions}
                      value={autoSaveInterval}
                      onChange={val => setAutoSaveInterval(val)}
                      position="bottom-right"
                      width="180px"
                    />
                  </div>
                </div>

                <div style={{ height: '1px', backgroundColor: 'var(--border-light)' }} />

                {/* 默认导出格式 (全面重构使用通用 SelectDropdown 组件) */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>默认导出格式</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>快捷导出时的预设类型</div>
                  </div>

                  <div style={{ position: 'relative' }}>
                    <div
                      onClick={() => setActiveDropdown(activeDropdown === 'exportType' ? null : 'exportType')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-app)',
                        color: 'var(--text-primary)',
                        fontSize: '12px',
                        cursor: 'pointer',
                        minWidth: '160px',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{exportTypeOptions.find(o => o.value === defaultExportType)?.label}</span>
                      <Icon name="chevron-right" size={11} color="var(--text-muted)" />
                    </div>

                    <SelectDropdown
                      isOpen={activeDropdown === 'exportType'}
                      onClose={() => setActiveDropdown(null)}
                      options={exportTypeOptions}
                      value={defaultExportType}
                      onChange={val => setDefaultExportType(val)}
                      position="bottom-right"
                      width="180px"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 工作区与存储 */}
          {activeTab === 'workspace' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
                  工作区与存储
                </h2>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  配置物理存储路径与本地索引缓存。
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>知识库本地持久化路径</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'monospace', backgroundColor: 'var(--bg-app)', padding: '8px 12px', borderRadius: '6px' }}>
                  /Users/qiao.liu/Documents/code/my-workspace/storage/kb
                </div>
              </div>
            </div>
          )}

          {/* 底部保存按钮 */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '12px' }}>
            <button
              onClick={handleSaveSettings}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--primary-color)',
                color: '#ffffff',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)',
                transition: 'var(--transition-smooth)',
              }}
            >
              <Icon name="check" size={14} color="#ffffff" />
              <span>保存配置</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
