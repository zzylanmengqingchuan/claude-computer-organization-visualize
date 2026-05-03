# co-visualize

[English](README.en.md)

将 Claude Code 的可视化能力提炼为可独立使用的 Skill，专注**计算机组成原理**的交互式教学可视化。面向 408 考研学生，尤其适合缺乏硬件基础的软件工程专业同学。

## 示例

**静态内容与 SVG 硬件图示：**

![静态网页示例](images/static-web-demo.png)

**交互式逐步动画：**

![交互动画示例](images/interactive-animation-demo.gif)

![交互动画示例 2](images/interactive-animation-demo-2.gif)

[Live Demo](https://l0dyv.github.io/claude-algo-visualize/references/cache_overview.html) — Cache 全景参考实现

## 功能

- 生成完整的交互式 HTML 教学页面（单文件，无外部依赖）
- 支持多种输入场景：PDF/教材讲解、主题动画演示、指令/地址序列可视化、概念对比
- 内置 CSS 骨架（含深色模式）和五套 JS 动画模板
- SVG 硬件组件图 + 位级寄存器图 + 流水线时序表 + 逐步动画
- 覆盖 408 计组七大章节：系统概述、数据表示与运算、存储系统、指令系统、CPU、总线、I/O

## 知识点覆盖

| 章节 | 典型可视化内容 |
|---|---|
| 数据表示与运算 | 补码/原码/反码/移码、IEEE 754 浮点数位域动画 |
| 存储系统 | Cache 三种映射方式动画、LRU 替换演示、虚拟地址转换 |
| 指令系统 | 七种寻址方式图解、操作码扩展 |
| CPU | 五段流水线时序图、数据冒险停顿演示、数据通路 SVG |
| 总线 | 三种仲裁方式图解、同步/异步定时时序 |
| I/O 系统 | DMA 传输流程动画、中断处理时序 |

## 安装

```bash
npx skills add L0dyv/claude-algo-visualize
```

或手动克隆到 Claude Code 技能目录：

```bash
git clone https://github.com/L0dyv/claude-algo-visualize.git ~/.claude/skills/co-visualize
```

## 项目结构

```
co-visualize/
├── SKILL.md                  # 技能定义与使用指南（含铁律、模板选择速查、408知识覆盖范围）
├── assets/
│   ├── base.css              # CSS 骨架（含深色模式、流水线时序表、位级寄存器样式）
│   ├── boilerplate.js        # JS 动画模板（A:完全二叉树 / B:自定义坐标 / C:纯数组 / D:流水线 / E:位级）
│   └── animation-html.html   # HTML 动画骨架（五种结构，含计组专用结构4和5）
└── references/
    └── cache_overview.html   # 完整参考实现：Cache 高速缓冲存储器全景（452行）
```

## 使用

安装后在 Claude Code 中自动激活。适用场景：

- 提供 PDF/讲义，要求生成知识点讲解页面
- 给出主题（如"演示流水线数据冒险"），生成教学 + 动画页面
- 提供指令序列或内存地址，生成逐步执行动画
- 要求对比两个概念（如"直接映射 vs 组相联"、"中断 vs DMA"）

## 致谢

本项目感谢 [Linux.do](https://linux.do) 社区对开源分享与传播的推动。
