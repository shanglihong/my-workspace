---
trigger: always_on
---

# DDD 后端编程指南

本指南基于领域驱动设计（DDD）与六边形架构，定义语言无关（Language-Agnostic）的通用后端代码组织规范。

## 一、 代码目录层级

后端代码统一包含在 backend/src/ 目录下，划分为以下 11 个核心目录/组件：

1. **src/api**：HTTP API 控制器、gRPC 服务路由与外部 Web 协议处理入口。
2. **src/application**：应用层。负责编排业务流程、跨领域服务协作与事务控制。
3. **src/common**：跨层级通用契约。包含公共 DTO、标准枚举、全局错误码与通用常量。
4. **src/consumers**：消息队列与异步事件消费者（如 Kafka, RabbitMQ, RocketMQ Consumer）。
5. **src/container**：依赖注入容器与组合装配入口。用于控制反转（IoC）与服务工厂实例化。
6. **src/domain**：核心领域层。存放业务领域逻辑，包含实体（Entities）、值对象（Value Objects）与领域服务（Domain Services）。
7. **src/health**：健康检查探针。提供 Liveness Check、Readiness Check 与系统自检接口。
8. **src/infrastructure**：基础设施层。负责数据库持久化、缓存、消息队列发布者与第三方外部 API 客户端的具体实现。
9. **src/main**：应用程序主启动入口。解析配置、初始化容器并启动应用服务。
10. **src/schedulers**：定时任务与 Cron Job 调度器入口。
11. **src/utils**：通用工具函数。仅依赖标准库的纯辅助函数。

## 二、 层级依赖约束

1. **单向依赖原则**：
   - 驱动层（`api`, `consumers`, `schedulers`, `health`）处于系统最外层，必须且只能调用 `application` 应用层服务。
   - **严禁**驱动层直接跳过应用层操作 `infrastructure` 数据源或篡改 `domain` 实体状态。
   - `application` 层只能依赖领域服务接口与公共契约，禁止依赖存储层具体实现（Repository Implementation）。
   - `domain` 层保持纯粹，通过 `port` 仓储接口与基础设施交互，不依赖任何外部框架。
   - `infrastructure` 属于被驱动的适配器层（Driven Adapters），允许实现 `domain` 中定义的仓储接口与领域契约。

2. **业务决策隔离**：
   - `infrastructure` 层严禁进行任何业务决策（如默认值填充、重试状态流转等），业务规则属于 `domain` 层。

## 三、 编程实践

1. **实体 (Entities)**：
   - 实体包含数据和内聚行为（如状态判断、状态转换等无外部依赖的行为）。
   - 实体行为应高度内聚。

2. **领域服务 (Domain Services)**：
   - 领域服务仅包含纯粹业务逻辑，用于编排不同实体的动作。
   - **依赖注入与传递防护**：上层在注入时必须仅依赖领域服务接口，消除对具体实现类的装配传递依赖。
   - **接口收拢**：领域的仓储接口与服务接口统一合并收拢在同包下的 `port` 文件中管理。

3. **基础设施与并发**：
   - 持久化结构体与数据库操作对象保持无状态，支持并发安全调用。
   - 涉及多步骤操作时，必须在应用层显式声明事务边界与异常回滚机制。