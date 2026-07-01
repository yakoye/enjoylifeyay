// 此文件由 scripts/sync-legacy-archive.mjs 从 docs/CONTENT_MIGRATION_MANIFEST.csv 自动生成。
// 请不要手工修改；更新历史来源后运行 npm run sync:legacy-archive 或 npm run build。

export type LegacyArchiveEntry = {
  id: string;
  title: string;
  href: string;
  date: string;
  source: 'CSDN' | 'EnjoyLifeBlog';
};

export type LegacySourceLink = {
  id: string;
  title: string;
  description: string;
  href: string;
  source: string;
};

export const legacyArchiveEntries: LegacyArchiveEntry[] = [
  {
    "id": "enjoylifeblog-14",
    "title": "PCIe低功耗",
    "href": "https://globetreklog.github.io/EnjoyLifeBlog/2024/06/12/PCIe%E4%BD%8E%E5%8A%9F%E8%80%97/",
    "date": "2024-06-12",
    "source": "EnjoyLifeBlog"
  },
  {
    "id": "enjoylifeblog-13",
    "title": "PCIe问题汇总-1",
    "href": "https://globetreklog.github.io/EnjoyLifeBlog/2024/06/06/PCIe%E9%97%AE%E9%A2%98%E6%B1%87%E6%80%BB-1/",
    "date": "2024-06-06",
    "source": "EnjoyLifeBlog"
  },
  {
    "id": "enjoylifeblog-12",
    "title": "PCIe MSI / MSI-X：Capability、Table 与 Linux 驱动接口",
    "href": "https://globetreklog.github.io/EnjoyLifeBlog/2024/05/24/PCIe-MSI-MSIX%E7%AE%80%E4%BB%8B/",
    "date": "2024-05-24",
    "source": "EnjoyLifeBlog"
  },
  {
    "id": "enjoylifeblog-11",
    "title": "PCIe概念，一句话说明白",
    "href": "https://globetreklog.github.io/EnjoyLifeBlog/2024/05/08/PCIe%E6%A6%82%E5%BF%B5%EF%BC%8C%E4%B8%80%E5%8F%A5%E8%AF%9D%E8%AF%B4%E6%98%8E%E7%99%BD/",
    "date": "2024-05-08",
    "source": "EnjoyLifeBlog"
  },
  {
    "id": "enjoylifeblog-9",
    "title": "方言",
    "href": "https://globetreklog.github.io/EnjoyLifeBlog/2024/05/06/%E6%96%B9%E8%A8%80/",
    "date": "2024-05-06",
    "source": "EnjoyLifeBlog"
  },
  {
    "id": "enjoylifeblog-10",
    "title": "关于肥胖",
    "href": "https://globetreklog.github.io/EnjoyLifeBlog/2024/05/06/%E5%85%B3%E4%BA%8E%E8%82%A5%E8%83%96/",
    "date": "2024-05-06",
    "source": "EnjoyLifeBlog"
  },
  {
    "id": "enjoylifeblog-8",
    "title": "沙生植物",
    "href": "https://globetreklog.github.io/EnjoyLifeBlog/2024/04/29/%E6%B2%99%E7%94%9F%E6%A4%8D%E7%89%A9/",
    "date": "2024-04-29",
    "source": "EnjoyLifeBlog"
  },
  {
    "id": "enjoylifeblog-7",
    "title": "常见植物的花",
    "href": "https://globetreklog.github.io/EnjoyLifeBlog/2024/04/25/%E5%B8%B8%E8%A7%81%E6%A4%8D%E7%89%A9%E7%9A%84%E8%8A%B1/",
    "date": "2024-04-25",
    "source": "EnjoyLifeBlog"
  },
  {
    "id": "enjoylifeblog-6",
    "title": "极简生活",
    "href": "https://globetreklog.github.io/EnjoyLifeBlog/2024/04/03/%E6%9E%81%E7%AE%80%E7%94%9F%E6%B4%BB/",
    "date": "2024-04-03",
    "source": "EnjoyLifeBlog"
  },
  {
    "id": "csdn-16",
    "title": "更改linux默认启动内核版本，修改 GRUB 设置",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/135927464",
    "date": "2024-01-30",
    "source": "CSDN"
  },
  {
    "id": "csdn-17",
    "title": "在Windows 10的PowerShell上实现对Linux机器，vscode同样可登录",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/135644189",
    "date": "2024-01-17",
    "source": "CSDN"
  },
  {
    "id": "csdn-18",
    "title": "右键菜单“以notepad++打开”，在windows文件管理器中",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/135264493",
    "date": "2023-12-28",
    "source": "CSDN"
  },
  {
    "id": "enjoylifeblog-5",
    "title": "原则1-2 瑞·达利欧",
    "href": "https://globetreklog.github.io/EnjoyLifeBlog/2023/11/11/%E5%8E%9F%E5%88%991-2_%E7%91%9E%C2%B7%E8%BE%BE%E5%88%A9%E6%AC%A7/",
    "date": "2023-11-11",
    "source": "EnjoyLifeBlog"
  },
  {
    "id": "csdn-19",
    "title": "【收藏】常用软件下载",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/133352479",
    "date": "2023-09-27",
    "source": "CSDN"
  },
  {
    "id": "csdn-20",
    "title": "windows bat脚本，使用命令行增加/删除防火墙：入站-出站，规则",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/132343372",
    "date": "2023-08-17",
    "source": "CSDN"
  },
  {
    "id": "csdn-21",
    "title": "mobaxterm显示“-＞“指针、“＞=“大于等于、“!=“不等于等这种符号会自动替换符号，如何关闭?",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/131869928",
    "date": "2023-07-22",
    "source": "CSDN"
  },
  {
    "id": "csdn-23",
    "title": "【一文搞定】vscode--ssh remote多级跳转，连接到目标主机，免密登录、默认选平台",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/131765767",
    "date": "2023-07-17",
    "source": "CSDN"
  },
  {
    "id": "csdn-22",
    "title": "如何使用 SSH 远程控制一台 Windows 服务器",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/131772243",
    "date": "2023-07-17",
    "source": "CSDN"
  },
  {
    "id": "csdn-24",
    "title": "【最新】编译 pciutils （lspci, setpci）在 Windows x86 平台，Compile pciutils (lspci, setpci) in Windows x86",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/131654661",
    "date": "2023-07-11",
    "source": "CSDN"
  },
  {
    "id": "csdn-25",
    "title": "MingW-W64-builds那么多版本，他们的区别是什么呢？",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/131614026",
    "date": "2023-07-08",
    "source": "CSDN"
  },
  {
    "id": "enjoylifeblog-4",
    "title": "臣服实验 迈克·A.辛格",
    "href": "https://globetreklog.github.io/EnjoyLifeBlog/2023/06/27/%E8%87%A3%E6%9C%8D%E5%AE%9E%E9%AA%8C_%E8%BF%88%E5%85%8B%C2%B7A.%E8%BE%9B%E6%A0%BC/",
    "date": "2023-06-27",
    "source": "EnjoyLifeBlog"
  },
  {
    "id": "csdn-26",
    "title": "bash脚本if语句比较为什么要用x",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/131201171",
    "date": "2023-06-14",
    "source": "CSDN"
  },
  {
    "id": "enjoylifeblog-3",
    "title": "额尔古纳河右岸 迟子建",
    "href": "https://globetreklog.github.io/EnjoyLifeBlog/2022/09/11/%E9%A2%9D%E5%B0%94%E5%8F%A4%E7%BA%B3%E6%B2%B3%E5%8F%B3%E5%B2%B8_%E8%BF%9F%E5%AD%90%E5%BB%BA/",
    "date": "2022-09-11",
    "source": "EnjoyLifeBlog"
  },
  {
    "id": "csdn-27",
    "title": "使用Fontcreator字体制作软件及字体设计学习",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/126292598",
    "date": "2022-08-12",
    "source": "CSDN"
  },
  {
    "id": "csdn-28",
    "title": "word批量设置图片大小和对齐，使用宏定义",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/124772197",
    "date": "2022-05-14",
    "source": "CSDN"
  },
  {
    "id": "csdn-29",
    "title": "git速查",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/123702724",
    "date": "2022-03-24",
    "source": "CSDN"
  },
  {
    "id": "enjoylifeblog-2",
    "title": "平面国 埃德温·A·艾勃特",
    "href": "https://globetreklog.github.io/EnjoyLifeBlog/2022/02/26/%E5%B9%B3%E9%9D%A2%E5%9B%BD_%E5%9F%83%E5%BE%B7%E6%B8%A9%C2%B7A%C2%B7%E8%89%BE%E5%8B%83%E7%89%B9/",
    "date": "2022-02-26",
    "source": "EnjoyLifeBlog"
  },
  {
    "id": "csdn-30",
    "title": "C语言速查",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/120378280",
    "date": "2021-09-19",
    "source": "CSDN"
  },
  {
    "id": "enjoylifeblog-1",
    "title": "自我突围 施一公",
    "href": "https://globetreklog.github.io/EnjoyLifeBlog/2021/06/10/%E8%87%AA%E6%88%91%E7%AA%81%E5%9B%B4_%E6%96%BD%E4%B8%80%E5%85%AC/",
    "date": "2021-06-10",
    "source": "EnjoyLifeBlog"
  },
  {
    "id": "csdn-15",
    "title": "博客快速通道",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/79299722",
    "date": "2021-01-10",
    "source": "CSDN"
  },
  {
    "id": "csdn-31",
    "title": "老男孩读PCIe介绍系列",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/112433384",
    "date": "2021-01-10",
    "source": "CSDN"
  },
  {
    "id": "csdn-32",
    "title": "vscode常用快捷键，配置、问题",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/112389598",
    "date": "2021-01-09",
    "source": "CSDN"
  },
  {
    "id": "csdn-33",
    "title": "C 语言入门",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/112018738",
    "date": "2020-12-31",
    "source": "CSDN"
  },
  {
    "id": "csdn-34",
    "title": "Linux速查（自用）",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/111995075",
    "date": "2020-12-30",
    "source": "CSDN"
  },
  {
    "id": "csdn-35",
    "title": "vscode插件(扩展)Monokai pro提示需要li**se解决办法",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/111565063",
    "date": "2020-12-22",
    "source": "CSDN"
  },
  {
    "id": "csdn-36",
    "title": "git使用问题总结",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/111276877",
    "date": "2020-12-16",
    "source": "CSDN"
  },
  {
    "id": "csdn-37",
    "title": "Xshell超250+配色方案(主题)  及其推荐",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/111213072",
    "date": "2020-12-15",
    "source": "CSDN"
  },
  {
    "id": "csdn-38",
    "title": "vim速查图(可能是全网最高清中文版本)-适合打印",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/110923086",
    "date": "2020-12-09",
    "source": "CSDN"
  },
  {
    "id": "csdn-39",
    "title": "Source Insight 中文注释为乱码解决办法（完美解决，一键搞定）",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/70174752",
    "date": "2020-04-07",
    "source": "CSDN"
  },
  {
    "id": "csdn-40",
    "title": "用Graphviz画图流程图得",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/104006945",
    "date": "2020-01-17",
    "source": "CSDN"
  },
  {
    "id": "csdn-41",
    "title": "编程官方、标准、草稿文档汇总参考",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/103817551",
    "date": "2020-01-03",
    "source": "CSDN"
  },
  {
    "id": "csdn-42",
    "title": "diff命令--输出格式解读",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/103610792",
    "date": "2019-12-19",
    "source": "CSDN"
  },
  {
    "id": "csdn-43",
    "title": "（最新）cpu天梯图 (CPU)- Processor Benchmarks",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/103578526",
    "date": "2019-12-17",
    "source": "CSDN"
  },
  {
    "id": "csdn-44",
    "title": "Linux根目录/空间不足,du未发现大文件解决办法",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/103427131",
    "date": "2019-12-06",
    "source": "CSDN"
  },
  {
    "id": "csdn-45",
    "title": "文件夹重命名(或移动)却找不到指定该文件类型咋办？",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/102060206",
    "date": "2019-10-04",
    "source": "CSDN"
  },
  {
    "id": "csdn-46",
    "title": "傅里叶变换解析-来龙去脉全解析",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/101906299",
    "date": "2019-10-02",
    "source": "CSDN"
  },
  {
    "id": "csdn-47",
    "title": "windows软件窗口或者对话框太大超出屏幕解决办法",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/100017439",
    "date": "2019-08-22",
    "source": "CSDN"
  },
  {
    "id": "csdn-48",
    "title": "Chrome 快捷键",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/99413084",
    "date": "2019-08-13",
    "source": "CSDN"
  },
  {
    "id": "csdn-49",
    "title": "让ubuntu18.04开机进入命令行模式或还原",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/96897234",
    "date": "2019-07-22",
    "source": "CSDN"
  },
  {
    "id": "csdn-50",
    "title": "Linux -systemd管理中的时间同步",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/95951179",
    "date": "2019-07-15",
    "source": "CSDN"
  },
  {
    "id": "csdn-52",
    "title": "Manjaro-architect 安装指南",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/95861978",
    "date": "2019-07-14",
    "source": "CSDN"
  },
  {
    "id": "csdn-51",
    "title": "VMware-tools安装以及找不到共享文件夹的解决办法",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/95899425",
    "date": "2019-07-14",
    "source": "CSDN"
  },
  {
    "id": "csdn-53",
    "title": "双击html或cmd文件后, 自动打开网站的方法",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/93479694",
    "date": "2019-06-24",
    "source": "CSDN"
  },
  {
    "id": "csdn-54",
    "title": "openssl工具使用",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/92727072",
    "date": "2019-06-17",
    "source": "CSDN"
  },
  {
    "id": "csdn-55",
    "title": "bash 和 tcsh(csh)的不同，带例子",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/85335776",
    "date": "2018-12-29",
    "source": "CSDN"
  },
  {
    "id": "csdn-57",
    "title": "Eclipse中快捷键组合",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/83583205",
    "date": "2018-10-31",
    "source": "CSDN"
  },
  {
    "id": "csdn-56",
    "title": "Makefile学习笔记",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/83584235",
    "date": "2018-10-31",
    "source": "CSDN"
  },
  {
    "id": "csdn-58",
    "title": "查看大文件的方法总结",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/83444737",
    "date": "2018-10-27",
    "source": "CSDN"
  },
  {
    "id": "csdn-59",
    "title": "如何学习R语言",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/83058616",
    "date": "2018-10-15",
    "source": "CSDN"
  },
  {
    "id": "csdn-60",
    "title": "电脑中文档整理的原则",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/82925920",
    "date": "2018-10-02",
    "source": "CSDN"
  },
  {
    "id": "csdn-61",
    "title": "学习如何学习",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/82821905",
    "date": "2018-09-23",
    "source": "CSDN"
  },
  {
    "id": "csdn-62",
    "title": "编写Vim脚本",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/81871136",
    "date": "2018-08-20",
    "source": "CSDN"
  },
  {
    "id": "csdn-63",
    "title": "在Windows上安装xshell，并ssh虚拟机Ubuntu",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/81482928",
    "date": "2018-08-07",
    "source": "CSDN"
  },
  {
    "id": "csdn-64",
    "title": "C语言-数组、字符指针数组函数接口与使用",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/81358776",
    "date": "2018-08-02",
    "source": "CSDN"
  },
  {
    "id": "csdn-65",
    "title": "Linux- find命令的例子",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/81126859",
    "date": "2018-07-20",
    "source": "CSDN"
  },
  {
    "id": "csdn-66",
    "title": "PCI Express (PCIe)  介绍",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/81096619",
    "date": "2018-07-18",
    "source": "CSDN"
  },
  {
    "id": "csdn-67",
    "title": "VBScript - SendKeys 方法",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/81000634",
    "date": "2018-07-11",
    "source": "CSDN"
  },
  {
    "id": "csdn-68",
    "title": "嵌入式系统开发-学习路线",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/80782376",
    "date": "2018-06-23",
    "source": "CSDN"
  },
  {
    "id": "csdn-69",
    "title": "Linux-进程",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/80770839",
    "date": "2018-06-22",
    "source": "CSDN"
  },
  {
    "id": "csdn-70",
    "title": "vim常用插件快捷键、功能",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/80608706",
    "date": "2018-06-07",
    "source": "CSDN"
  },
  {
    "id": "csdn-71",
    "title": "PCIe资料分享-快速入门",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/80370986",
    "date": "2018-05-19",
    "source": "CSDN"
  },
  {
    "id": "csdn-72",
    "title": "C语言-static、extern",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/80217065",
    "date": "2018-05-06",
    "source": "CSDN"
  },
  {
    "id": "csdn-73",
    "title": "windows CMD命令大全",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/80047980",
    "date": "2018-04-23",
    "source": "CSDN"
  },
  {
    "id": "csdn-74",
    "title": "文件权限中 chmod、u+x、u、r、w、x分别代表什么",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/79912495",
    "date": "2018-04-12",
    "source": "CSDN"
  },
  {
    "id": "csdn-75",
    "title": "SSH 免密登录",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/79851904",
    "date": "2018-04-08",
    "source": "CSDN"
  },
  {
    "id": "csdn-76",
    "title": "Linux入门指导",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/79830275",
    "date": "2018-04-05",
    "source": "CSDN"
  },
  {
    "id": "csdn-77",
    "title": "python-数学计算",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/79624177",
    "date": "2018-03-20",
    "source": "CSDN"
  },
  {
    "id": "csdn-78",
    "title": "处理器-硬件-术语表",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/79592690",
    "date": "2018-03-17",
    "source": "CSDN"
  },
  {
    "id": "csdn-79",
    "title": "新员工之间的差距",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/79507643",
    "date": "2018-03-10",
    "source": "CSDN"
  },
  {
    "id": "csdn-80",
    "title": "寄存器、RAM、ROM、CACHE、Flash相关概念区别整理",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/79495336",
    "date": "2018-03-09",
    "source": "CSDN"
  },
  {
    "id": "csdn-81",
    "title": "如何在各种编程语言中生成安全的随机数？",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/79228383",
    "date": "2018-02-01",
    "source": "CSDN"
  },
  {
    "id": "csdn-82",
    "title": "大端序和小端序",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/79193660",
    "date": "2018-01-29",
    "source": "CSDN"
  },
  {
    "id": "csdn-83",
    "title": "正则表达式-笔记",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/79107873",
    "date": "2018-01-19",
    "source": "CSDN"
  },
  {
    "id": "csdn-84",
    "title": "密码学-学习资料和网站",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/79012425",
    "date": "2018-01-09",
    "source": "CSDN"
  },
  {
    "id": "csdn-85",
    "title": "小工具",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/78825620",
    "date": "2017-12-17",
    "source": "CSDN"
  },
  {
    "id": "csdn-86",
    "title": "Python学习资料篇",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/78702210",
    "date": "2017-12-03",
    "source": "CSDN"
  },
  {
    "id": "csdn-87",
    "title": "初装linux和Mac的一些配置",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/78679891",
    "date": "2017-11-30",
    "source": "CSDN"
  },
  {
    "id": "csdn-88",
    "title": "如何像 NASA 顶级程序员一样编程 —— 10 条重要原则",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/78641464",
    "date": "2017-11-27",
    "source": "CSDN"
  },
  {
    "id": "csdn-89",
    "title": "C语言-书籍资料汇总",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/78461849",
    "date": "2017-11-06",
    "source": "CSDN"
  },
  {
    "id": "csdn-90",
    "title": "史上最强的Vim 配置文件（原版+中文改进版）",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/77744513",
    "date": "2017-08-31",
    "source": "CSDN"
  },
  {
    "id": "csdn-91",
    "title": "加密算法基础- Montgomery(蒙哥马利)乘法介绍",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/77644958",
    "date": "2017-08-28",
    "source": "CSDN"
  },
  {
    "id": "csdn-92",
    "title": "嵌入到博客中的小动画",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/77474347",
    "date": "2017-08-22",
    "source": "CSDN"
  },
  {
    "id": "csdn-93",
    "title": "算法-大数乘法（16进制）（C语言实现）",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/77435847",
    "date": "2017-08-20",
    "source": "CSDN"
  },
  {
    "id": "csdn-94",
    "title": "markdow-文档中图片居中",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/77161857",
    "date": "2017-08-14",
    "source": "CSDN"
  },
  {
    "id": "csdn-96",
    "title": "文章-编程需要知道多少数学知识？",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/77131393",
    "date": "2017-08-12",
    "source": "CSDN"
  },
  {
    "id": "csdn-95",
    "title": "C语言-结构体中的冒号：位字段",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/77131567",
    "date": "2017-08-12",
    "source": "CSDN"
  },
  {
    "id": "csdn-97",
    "title": "文章-智力与常识有什么区别？",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/77104066",
    "date": "2017-08-11",
    "source": "CSDN"
  },
  {
    "id": "csdn-98",
    "title": "文章-自学的程序员如何找到好工作？",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/77103438",
    "date": "2017-08-11",
    "source": "CSDN"
  },
  {
    "id": "csdn-99",
    "title": "最简单的vim或gvim学习入门教程",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/76986390",
    "date": "2017-08-09",
    "source": "CSDN"
  },
  {
    "id": "csdn-100",
    "title": "vim设置及其命令",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/76571510",
    "date": "2017-08-02",
    "source": "CSDN"
  },
  {
    "id": "csdn-101",
    "title": "Linux 中C/C++ search path（头文件搜索路径）",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/76135980",
    "date": "2017-07-26",
    "source": "CSDN"
  },
  {
    "id": "csdn-102",
    "title": "c++ 内联函数（一看就懂）",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/76044493",
    "date": "2017-07-25",
    "source": "CSDN"
  },
  {
    "id": "csdn-103",
    "title": "C++命名空间通俗讲解",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/76014413",
    "date": "2017-07-24",
    "source": "CSDN"
  },
  {
    "id": "csdn-104",
    "title": "【官方解说】Visual Studio 2017（VS 2017）各个版本有什么区别",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/72877862",
    "date": "2017-06-06",
    "source": "CSDN"
  },
  {
    "id": "csdn-105",
    "title": "在 Word 中撰写并发布到博客的帮助",
    "href": "https://blog.csdn.net/BjarneCpp/article/details/70185890",
    "date": "2017-04-15",
    "source": "CSDN"
  }
];

export const legacySourceLinks: LegacySourceLink[] = [
  {
    "id": "enjoylifeblog-source-1",
    "title": "PCIe概念汇总表格",
    "description": "附件型资料，版权与公开范围需人工确认",
    "href": "https://raw.githubusercontent.com/GlobeTrekLog/EnjoyLifeBlog/main/_posts/PCIe%E6%A6%82%E5%BF%B5%E6%B1%87%E6%80%BB%E8%A1%A8%E6%A0%BC.xlsx",
    "source": "EnjoyLifeBlog"
  },
  {
    "id": "zhihu-source-2",
    "title": "知乎个人内容页",
    "description": "知乎历史内容入口；待获得可核对标题和日期的导出数据后再写入时间线。",
    "href": "https://www.zhihu.com/people/wikiye/posts",
    "source": "Zhihu"
  }
];
