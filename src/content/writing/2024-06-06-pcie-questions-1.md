---
title: "PCIe 问题汇总 1"
description: "围绕 Endpoint BAR 分配异常等问题的排查记录。"
date: 2024-06-06
publishedAt: 2024-06-06T00:00:00+08:00
updated: null
source: native
sourceUrl: ""
migratedAt: null
domain: technology
format: "answer"
topics: ["PCIe", "调试"]
tags: ["PCIe", "BAR", "调试"]
series: ["pcie-high-speed-interconnect"]
legacy: false
cover: ""
coverAlt: ""
mediaKey: "legacy-2024-06-06-pcie-questions"
draft: false
featured: false
---
## 问题1：EP的BAR空间分配失败问题

### 现象

EP mode，我看RC这边可以`lspci -vvv`看到EP的信息，也就是config space能读写，但是EP的bar分配好像失败了，具体是啥原因呢？



下图是用`lspci -vvv`看到的现象，即，Region 0也就是BAR0出现了 unassigned情况，有virtual字样。明显异常了。

![e8c94a016aee249ff8a4abe15284950](/images/articles/legacy-2024-06-06-pcie-questions/image-abb0fe63b6b7dade.png)

dmesg看到如下情况：

![3ead4c86d885f697a4b2f1ee373eeb5](/images/articles/legacy-2024-06-06-pcie-questions/image-dda6af0c99f1206f.png)

自研EP，在FPGA，EMU验证好的，实际芯片有点问题。

### 排查与解决

**解决思路：**

debug过程看到，在枚举的时候，会判断class code，目前这个没有配置，数值都是0.

![a1e5dc34259bb035b3c2477910be059](/images/articles/legacy-2024-06-06-pcie-questions/image-a5d704a56447da7a.jpg)

从kernel日志看，给ep分配bar的流程没走。

配置class code就会解决问题。

### Class Code 的作用

**这个class code 是什么，有什么用途呢？**

![image-20240606173032697](/images/articles/legacy-2024-06-06-pcie-questions/image-660be887298dab6b.png)



PCIe的Class Code（类代码）在PCIe设备的配置空间中，用于标识设备的功能类型和用途。它由3个字节组成，分别为Base Class（基本类）、Sub-Class（子类）和Programming Interface（编程接口）。具体作用如下：

1. **设备分类**：Class Code帮助操作系统和驱动程序识别设备的功能。例如，它可以区分网络控制器、存储控制器、显示控制器等不同类型的设备。
2. **驱动程序加载**：操作系统可以根据Class Code来加载合适的驱动程序。这对于系统自动识别和配置设备非常重要。
3. **设备管理**：管理工具和软件可以根据Class Code显示设备类型，从而提供相应的管理功能。

下图是Base Class Code具体数值解释：

![image-20240606173443306](/images/articles/legacy-2024-06-06-pcie-questions/image-ece6324c16b011ae.png)

再细分，对于base class code = 03h，是Display Controller如下：

![image-20240606174109899](/images/articles/legacy-2024-06-06-pcie-questions/image-b8d2f11905cd6812.png)

​	具体见文档：PCI Code and ID Assignment Specification

### 后续排查

**其他思路：**

- BIOS阶段看看有没有分配成功
- 不加载设备驱动看是否分配成功
- LTSSM是否是L0，配置空间读到是全F，还是正常数值
- ep重启或者linkdown过吧，bar size是否恢复成默认的了？
