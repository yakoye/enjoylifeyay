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
  assert.ok(sites.length >= 65, '应保留用户提供的独立站与长文专题列表');
  assert.equal(new Set(ids).size, ids.length, '站外专题不能有重复站点');
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
  assert.ok(sites.every((site) => site.description.length <= 48), '站外专题描述应控制在桌面端尽量一行显示的长度');
  for (const required of ['聚合理论', '太阳能供电', 'BBS 时代', '日本古道', '一分钟短文']) {
    assert.match(sites.map((site) => site.description).join('\n'), new RegExp(required));
  }
});
