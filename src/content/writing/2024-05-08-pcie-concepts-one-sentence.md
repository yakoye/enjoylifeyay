---
title: "PCIe 概念，一句话说明白"
description: "一份待持续扩写的 PCIe 概念索引：从链路、事务、中断到调试问题逐步补全。"
date: 2024-05-08
publishedAt: 2024-05-08T00:00:00+08:00
updated: 2026-07-02
source: native
sourceUrl: ""
migratedAt: null
section: technology/pcie
tags: ["PCIe", "速查表"]
legacy: false
cover: ""
coverAlt: ""
mediaKey: "legacy-2024-05-08-pcie-concepts"
draft: false
featured: false
---

> 这是一份历史笔记整理出的索引页。它保留最初的主题线索，但不把未经逐项复核的旧表格当作当前规范结论；后续会逐节补充规范版本、平台差异和调试实例。

## 链路与带宽

- **Link Training**：链路双方从 Detect、Polling 到 Configuration、L0 的协商与训练过程。
- **Lane / Link Width**：一条 Link 可以由多条 Lane 组成，实际宽度可能与能力宽度不同。
- **Gen3 / Gen4 / Gen5 / Gen6**：代际提升不仅涉及速率，也涉及均衡、PAM4、FLIT 与 FEC 等机制；具体判断应以对应版本规范为准。
- **Equalization**：高速链路为补偿信道损耗而进行的发送端预设、系数与接收端协商过程。

## 事务与配置

- **TLP**：Transaction Layer Packet，承载 Memory、Configuration、Message 等事务。
- **MPS / MRRS / RCB**：分别影响单个请求、完成包与完成边界的大小和拆分方式。
- **BAR / Resizable BAR**：设备暴露地址空间的方式，以及软件为其分配和调整窗口的过程。
- **Capability**：标准和扩展能力以链表形式组织在 Configuration Space 中。

## 中断与错误处理

- **INTx / MSI / MSI-X**：从传统引脚中断到消息中断与多向量中断。
- **AER**：Advanced Error Reporting，用于记录和处理可纠正、不可纠正及致命错误。
- **SR-IOV**：让一个 Physical Function 暴露多个 Virtual Function 的虚拟化机制。

## 调试线索

- 枚举是否完成，Configuration Space 是否可读；
- BAR 是否成功分配，Class Code 与资源窗口是否合理；
- LTSSM、链路宽度、速率、均衡状态是否符合预期；
- AER、dmesg、lspci 与固件日志之间是否能相互印证；
- 先区分硬件能力、软件配置、平台资源与驱动行为，再定位具体问题。

## 待补充

后续会把 Resizable BAR、Lane Margining、Completion Timeout、低功耗、MSI/MSI-X、AER 和实际 bring-up 问题分别整理为独立文章，并在这里维护索引。
