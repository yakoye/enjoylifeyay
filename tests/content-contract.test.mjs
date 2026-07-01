import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Astro 使用静态输出且内容 schema 保留严格枚举', async () => {
  const astroConfig = await readFile(new URL('../astro.config.mjs', import.meta.url), 'utf8');
  const schema = await readFile(new URL('../src/content.config.ts', import.meta.url), 'utf8');
  const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
  const nvmrc = (await readFile(new URL('../.nvmrc', import.meta.url), 'utf8')).trim();

  assert.match(astroConfig, /output:\s*['"]static['"]/);
  assert.equal(packageJson.engines.node, '>=22.12.0 <23');
  assert.equal(nvmrc, '22.12.0');
  assert.match(schema, /from ['"]astro\/zod['"]/);
  assert.doesNotMatch(schema, /import\s*\{[^}]*\bz\b[^}]*\}\s*from\s*['"]astro:content['"]/);
  assert.doesNotMatch(schema, /z\.string\(\)\.url\(\)/);
  for (const value of ['technology', 'reading', 'life', 'nature', 'tools']) {
    assert.match(schema, new RegExp(`['"]${value}['"]`));
  }
  for (const value of ['article', 'answer', 'note', 'guide', 'reference', 'project-log']) {
    assert.match(schema, new RegExp(`['"]${value}['"]`));
  }
  for (const value of ['native', 'csdn', 'zhihu', 'enjoy-life-blog']) {
    assert.match(schema, new RegExp(`['"]${value}['"]`));
  }
  assert.match(schema, /draft:\s*z\.boolean\(\)\.default\(true\)/);
});
