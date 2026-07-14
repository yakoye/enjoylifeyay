import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Astro 使用静态输出且内容 schema 保持严格 section 枚举', async () => {
  const astroConfig = await readFile(new URL('../astro.config.mjs', import.meta.url), 'utf8');
  const schema = await readFile(new URL('../src/content.config.ts', import.meta.url), 'utf8');
  const model = await readFile(new URL('../src/config/content-model.ts', import.meta.url), 'utf8');
  const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
  const nvmrc = (await readFile(new URL('../.nvmrc', import.meta.url), 'utf8')).trim();

  assert.match(astroConfig, /output:\s*['"]static['"]/);
  assert.equal(packageJson.engines.node, '>=24.0.0 <25');
  assert.equal(nvmrc, '24');
  assert.match(schema, /from ['"]astro\/zod['"]/);
  assert.doesNotMatch(schema, /z\.string\(\)\.url\(\)/);
  for (const value of ['technology/pcie', 'technology/systems', 'tools/software-productivity', 'reading/articles', 'life/movement']) {
    assert.ok(model.includes(`'${value}'`));
  }
  for (const value of ['native', 'CSDN', 'Zhihu']) {
    assert.match(schema, new RegExp(`['"]${value}['"]`));
  }
  assert.doesNotMatch(schema, new RegExp(['Enjoy', 'LifeBlog'].join('')));
});
