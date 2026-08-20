# Quickstart & Verification Guide: widgets-refactor

本文档提供重构后的自动化验证与手动体验测试流程。

## 1. 自动化类型检查与构建验证

在前端项目根目录下运行以下命令，确保无 TypeScript 错误及打包编译故障：

```bash
cd frontend
npm run build
```

期望输出：构建顺利完成，控制台无报错。

## 2. 功能一致性验证场景

启动前端开发服务器：

```bash
cd frontend
npm run dev
```

并在浏览器中验证以下核心场景：

1. **主页与试图切换测试**：
   - 点击侧边栏“主页”，确认展示全局工作台首页。
   - 点击侧边栏“知识库”，确认展开知识库大纲目录。
   - 点击侧边栏“计划任务管理”、“工具箱”、“云盘管理”，确认各自对应的页面正常渲染且顶部面包屑跟随变化。

2. **文档与画布编辑测试**：
   - 在知识库目录中选择普通 Markdown 文档节点，确认 `ContentViewport` 正常加载 DocEditor 且可编辑内容。
   - 在知识库目录中选择架构图/思维导图节点，确认正确嵌入 Draw.io 画布。

3. **侧边栏底部工具图标测试**：
   - 鼠标悬浮与点击侧边栏底部的日夜模式切换按钮，确认主题正常切换且 Tooltip 提示无误。

4. **架构依赖性校验**：
   - 检查 `frontend/src/widgets/content-viewport/ui/ContentViewport.tsx` 文件，确认不存在对 `@/pages/*` 的导入。
