import assert from 'node:assert/strict';
import test from 'node:test';

import { normalizeBasePath, prefixRootRelativeUrls } from '../scripts/prefix-base-path.mjs';

test('基础路径标准化为首尾斜杠', () => {
  assert.equal(normalizeBasePath(''), '/');
  assert.equal(normalizeBasePath('/'), '/');
  assert.equal(normalizeBasePath('enjoylifeyay'), '/enjoylifeyay/');
  assert.equal(normalizeBasePath('/enjoylifeyay/'), '/enjoylifeyay/');
});

test('GitHub Pages 构建只为 HTML 属性添加一次前缀，不改写内联脚本', () => {
  const source = `<a href="/reading/">阅读</a>
<img src='/images/example.png'>
<a href="//cdn.example.com/a">CDN</a>
<a href="https://example.com/">外链</a>
<a href="/enjoylifeyay/about/">关于</a>
<script>location.href = '/search/';</script>`;
  const output = prefixRootRelativeUrls(source, '/enjoylifeyay/');
  assert.match(output, /href="\/enjoylifeyay\/reading\/"/);
  assert.match(output, /src='\/enjoylifeyay\/images\/example\.png'/);
  assert.match(output, /href="\/\/cdn\.example\.com\/a"/);
  assert.match(output, /href="https:\/\/example\.com\/"/);
  assert.match(output, /href="\/enjoylifeyay\/about\/"/);
  assert.match(output, /location\.href = '\/search\/'/);
  assert.doesNotMatch(output, /\/enjoylifeyay\/enjoylifeyay\//);
});

test('Cloudflare 根路径构建不修改内容', () => {
  const source = '<a href="/reading/">阅读</a>';
  assert.equal(prefixRootRelativeUrls(source, '/'), source);
});
