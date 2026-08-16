import { NavNode } from '@/entities/navigation';

export const mockNavigationTree: NavNode[] = [
  {
    id: 'kb-yingshi',
    title: '影视',
    type: 'folder',
    isPinned: true,
    children: [
      {
        id: 'doc-shouye',
        title: '首页',
        type: 'doc',
        author: { name: '刘巧' },
        updatedAt: '5月10日修改',
        content: '# 影视知识库首页\n\n欢迎来到大沙河跑步1号影视创作与记录中心。',
      },
      {
        id: 'doc-dianying',
        title: '电影',
        type: 'doc',
        author: { name: '刘巧' },
        updatedAt: '5月10日修改',
        content: `# 电影

5月10日修改 | 作者: 刘巧

输入"/"快速插入内容，或点击新建子页面列表
`,
      },
      {
        id: 'doc-bairimeng',
        title: '白日梦想家',
        type: 'doc',
        author: { name: '刘巧' },
        updatedAt: '5月11日修改',
        content: '# 白日梦想家 (The Secret Life of Walter Mitty)\n\n电影分析与精彩剧照纪录。',
      },
      {
        id: 'chart-jiagou',
        title: '电视剧剧情架构图',
        type: 'chart',
        author: { name: '刘巧' },
        updatedAt: '5月12日修改',
        content: '',
      },
    ],
  },
  {
    id: 'doc-guide',
    title: '飞书管理员，你的快速上手指南',
    type: 'doc',
    isPinned: true,
    author: { name: '飞书团队' },
    updatedAt: '5月01日修改',
    content: '# 快速上手指南\n\n开启高效协同云文档之旅。',
  },
];

