import { NavNode } from '@/entities/navigation';

export const mockNavigationTree: NavNode[] = [
  {
    id: 'kb-yingshi',
    title: '影视知识库',
    type: 'folder',
    description: '影视剧本大纲、角色灵感与剧情结构分析知识库',
    isPinned: true,
    children: [
      {
        id: 'doc-dianying',
        title: '电影',
        type: 'doc',
        author: { name: '刘巧' },
        updatedAt: '5月10日修改',
        content: `# 电影\n\n5月10日修改 | 作者: 刘巧\n\n输入"/"快速插入内容，或点击新建子页面列表\n`,
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
    id: 'kb-xietong',
    title: '团队协同空间',
    type: 'folder',
    description: '产品规划、技术架构演进与多 Agent 协同知识归档',
    isPinned: true,
    children: [
      {
        id: 'doc-guide',
        title: '飞书管理员，你的快速上手指南',
        type: 'doc',
        author: { name: '飞书团队' },
        updatedAt: '5月01日修改',
        content: '# 快速上手指南\n\n开启高效协同云文档之旅。',
      },
    ],
  },
];

