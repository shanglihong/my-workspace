# Backend DDD Architecture Skeleton

本目录为后端语言无关（Language-Agnostic）的通用 DDD / 六边形架构项目骨架。

## 目录结构说明

所有后端核心代码统一组织在 `src/` 目录下：

```text
backend/
├── src/
│   ├── api/          # HTTP API 路由与 Controller 入口
│   ├── application/  # 业务应用编排层
│   ├── common/       # 跨模块通用 DTO、枚举与常量
│   ├── consumers/    # 消息队列事件消费者
│   ├── container/    # 依赖注入与服务装配容器
│   ├── domain/       # 核心业务领域层 (Entities, Domain Services, Ports)
│   ├── health/       # 健康检查与探针接口
│   ├── infrastructure/# 基础设施实现层 (DB, Redis, MQ, External API)
│   ├── main/         # 应用程序启动主入口
│   ├── schedulers/   # 定时任务与 Cron Job 调度器
│   └── utils/        # 纯标准库通用工具函数
└── README.md
```

详细架构约束与编码规范请参考项目规则文档 [.agents/rules/ddd.md](file://../.agents/rules/ddd.md)。
