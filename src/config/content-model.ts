/**
 * Content map shared by article metadata, section pages, breadcrumbs and tags.
 * Reader-facing labels are intentionally kept in one place so that the visible
 * information architecture stays consistent as the archive grows.
 */
export const writingSectionIds = [
  'technology/articles',
  'technology/pcie',
  'technology/chip-firmware',
  'technology/systems',
  'technology/engineering',
  'tools/software-productivity',
  'reading/articles',
  'reading/principles',
  'nature/plants',
  'nature/places',
  'nature/walking',
  'life/thoughts',
  'life/movement',
  'life/food',
  'life/travel',
  'life/family',
  'life/practice',
] as const;

export type WritingSection = (typeof writingSectionIds)[number];
export type ParentSection = WritingSection extends `${infer Parent}/${string}` ? Parent : never;

type SectionInfo = {
  parent: 'technology' | 'tools' | 'reading' | 'nature' | 'life';
  parentLabel: string;
  parentHref: string;
  label: string;
  href: string;
};

export const sectionInfo: Record<WritingSection, SectionInfo> = {
  'technology/articles': { parent: 'technology', parentLabel: '技术', parentHref: '/technology/', label: '技术文章', href: '/technology/articles/' },
  'technology/pcie': { parent: 'technology', parentLabel: '技术', parentHref: '/technology/', label: 'PCIe 与高速互连', href: '/technology/pcie/' },
  'technology/chip-firmware': { parent: 'technology', parentLabel: '技术', parentHref: '/technology/', label: '芯片、固件与 SoC 工程', href: '/technology/chip-firmware/' },
  'technology/systems': { parent: 'technology', parentLabel: '技术', parentHref: '/technology/', label: '系统与开发环境', href: '/technology/systems/' },
  'technology/engineering': { parent: 'technology', parentLabel: '技术', parentHref: '/technology/', label: '工程与职业', href: '/technology/engineering/' },
  'tools/software-productivity': { parent: 'tools', parentLabel: '工具', parentHref: '/tools/', label: '软件与效率', href: '/tools/software-productivity/' },
  'reading/articles': { parent: 'reading', parentLabel: '阅读', parentHref: '/reading/', label: '总结', href: '/reading/articles/' },
  'reading/principles': { parent: 'reading', parentLabel: '阅读', parentHref: '/reading/', label: '原则', href: '/reading/principles/' },
  'nature/plants': { parent: 'nature', parentLabel: '自然', parentHref: '/nature/', label: '植物', href: '/nature/plants/' },
  'nature/places': { parent: 'nature', parentLabel: '自然', parentHref: '/nature/', label: '地方记忆', href: '/nature/places/' },
  'nature/walking': { parent: 'nature', parentLabel: '自然', parentHref: '/nature/', label: '行走与观察', href: '/nature/walking/' },
  'life/thoughts': { parent: 'life', parentLabel: '生活', parentHref: '/life/', label: '生活与思考', href: '/life/thoughts/' },
  'life/movement': { parent: 'life', parentLabel: '生活', parentHref: '/life/', label: '运动', href: '/life/movement/' },
  'life/food': { parent: 'life', parentLabel: '生活', parentHref: '/life/', label: '饮食', href: '/life/food/' },
  'life/travel': { parent: 'life', parentLabel: '生活', parentHref: '/life/', label: '旅行', href: '/life/travel/' },
  'life/family': { parent: 'life', parentLabel: '生活', parentHref: '/life/', label: '家庭', href: '/life/family/' },
  'life/practice': { parent: 'life', parentLabel: '生活', parentHref: '/life/', label: '日常与方法', href: '/life/practice/' },
};

export function getSectionInfo(section: WritingSection) {
  return sectionInfo[section];
}

export function isInParentSection(section: WritingSection, parent: string) {
  return section.startsWith(`${parent}/`);
}

/** Former topic directories keep their old URLs but lead readers to the new map. */
export const legacySeriesRedirects: Record<string, string> = {
  'pcie-high-speed-interconnect': '/technology/pcie/',
  'chip-firmware-soc': '/technology/chip-firmware/',
  'windows-linux-git': '/technology/systems/',
  'chrome-web-tools': '/tools/extensions/',
  'cloudflare-personal-site': '/tools/diy/',
  'knowledge-obsidian': '/tools/writing/',
  'reading-learning': '/reading/articles/',
  'nature-walking': '/nature/walking/',
  'life-cycling': '/life/movement/',
  'life-running': '/life/movement/',
};
