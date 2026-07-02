import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relative) => readFile(path.join(root, relative), 'utf8');

test('v0.17 阅读页提供分类的站外专题与可手动置顶数据', async () => {
  const [page, dataText] = await Promise.all([
    read('src/pages/reading/index.astro'),
    read('src/content/reading-sites.json'),
  ]);
  const sites = JSON.parse(dataText);
  const ids = sites.map((site) => site.id);

  assert.match(page, /站外专题/);
  assert.match(page, /pinnedSites/);
  assert.match(page, /工程、系统与程序设计/);
  assert.match(page, /生活、独立工作与行走/);
  assert.ok(sites.length >= 96, '应保留用户扩充后的独立站与长文专题列表');
  assert.equal(new Set(ids).size, ids.length, '站外专题不能有重复站点');
  assert.equal(new Set(sites.map((site) => site.url)).size, sites.length, '站外专题不能有重复链接');
  assert.ok(sites.every((site) => typeof site.pinned === 'boolean'), '每个站点必须可手动置顶');
  assert.ok(sites.every((site) => /^https?:\/\//.test(site.url)), '每个站点必须有明确跳转地址');
  for (const required of ['dan-luu', 'gwern', 'paul-graham', 'craig-mod', 'textfiles', 'coolshell', 'scz']) {
    assert.ok(ids.includes(required), `缺少重要站外专题：${required}`);
  }
});

test('v0.17 阅读维护文档说明如何置顶与新增站外专题', async () => {
  const [readme, maintenance] = await Promise.all([
    read('README.md'),
    read('docs/CONTENT_MAINTENANCE.md'),
  ]);
  assert.match(readme, /reading-sites\.json/);
  assert.match(maintenance, /pinned/);
  assert.match(maintenance, /站外专题/);
});


test('v0.17.1 站外专题描述保留可记忆的单句提示', async () => {
  const sites = JSON.parse(await read('src/content/reading-sites.json'));
  assert.ok(sites.every((site) => site.description.length >= 16), '每个站点需要有足够辨识度的一句话说明');
  assert.ok(sites.every((site) => site.description.length <= 160), '站外专题描述应保持为一段简短说明，而不是正文段落');
  const byId = new Map(sites.map((site) => [site.id, site.description]));
  const anchors = [
    ['stratechery', '聚合理论'],
    ['low-tech-magazine', '太阳能供电'],
    ['textfiles', 'BBS 时代'],
    ['craig-mod', '长途徒步'],
    ['derek-sivers', '极简'],
    ['mechanical-sympathy', '机械共鸣'],
    ['tom-critchlow', '数字花园'],
  ];
  for (const [id, keyword] of anchors) {
    assert.match(byId.get(id) ?? '', new RegExp(keyword), `缺少可记忆描述锚点：${id}`);
  }
});

test('v0.17.3 站外专题桌面端允许最多两行说明', async () => {
  const [css, dataText] = await Promise.all([
    read('src/styles/global.css'),
    read('src/content/reading-sites.json'),
  ]);
  const sites = JSON.parse(dataText);
  assert.match(css, /-webkit-line-clamp:\s*2/);
  assert.match(css, /max-height:\s*3\.5em/);
  assert.ok(sites.length >= 96, '应保留用户维护的扩充站外专题数据');
  assert.ok(sites.every((site) => site.description.length <= 160), '每条描述应保持可读，不应扩张成正文段落');
});
