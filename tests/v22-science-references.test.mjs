import assert from 'node:assert/strict';
import test from 'node:test';

import { buildDoiVerificationUrl, parseScienceReferences, validateScienceReferences } from '../scripts/verify-science-references.mjs';

test('DOI 在线检查使用 Crossref Works API', () => {
  assert.equal(
    buildDoiVerificationUrl('10.1002/ejsp.674'),
    'https://api.crossref.org/works/10.1002%2Fejsp.674',
  );
});

test('科学引用检查器接受连续且全部使用的参考文献', () => {
  const markdown = `正文结论[1]，另一条结论[2]。

## 参考文献

1. Example A. PMID: 12345678.
2. Example B. DOI: 10.1000/example.
`;
  const parsed = parseScienceReferences(markdown);
  assert.deepEqual(parsed.citationNumbers, [1, 2]);
  assert.deepEqual(parsed.references.map((item) => item.number), [1, 2]);
  assert.deepEqual(validateScienceReferences(parsed), []);
});

test('科学引用检查器报告缺号、未定义和未使用条目', () => {
  const markdown = `正文结论[1][3]。

## 参考文献

1. Example A. PMID: 12345678.
2. Example B. PMID: 23456789.
4. Example D. PMID: 45678901.
`;
  const errors = validateScienceReferences(parseScienceReferences(markdown));
  assert.ok(errors.some((item) => item.includes('参考文献编号必须从 1 连续排列')));
  assert.ok(errors.some((item) => item.includes('正文引用 [3] 没有对应条目')));
  assert.ok(errors.some((item) => item.includes('参考文献 [2] 未在正文使用')));
});
