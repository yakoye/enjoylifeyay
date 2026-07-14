import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const articleUrl = new URL('../src/content/writing/2026-07-14-scientific_facts_body_behavior_psychology.md', import.meta.url);

const uniqueSorted = (values) => [...new Set(values)].sort((a, b) => a - b);

export function parseScienceReferences(markdown) {
  const heading = '\n## 参考文献';
  const headingIndex = markdown.indexOf(heading);
  const body = headingIndex >= 0 ? markdown.slice(0, headingIndex) : markdown;
  const referenceText = headingIndex >= 0 ? markdown.slice(headingIndex + heading.length) : '';
  const citationNumbers = uniqueSorted([...body.matchAll(/\[(\d+)\]/g)].map((match) => Number(match[1])));
  const references = [...referenceText.matchAll(/^(\d+)\.\s+(.+)$/gm)].map((match) => {
    const text = match[2].trim();
    const pmid = text.match(/PMID:\s*(\d+)/i)?.[1] ?? '';
    const pmcid = text.match(/PMCID:\s*(PMC\d+)/i)?.[1] ?? '';
    const doi = (text.match(/DOI:\s*(10\.\d{4,9}\/[\w.()/:;-]+)/i)?.[1] ?? '').replace(/\.$/, '');
    return { number: Number(match[1]), text, pmid, pmcid, doi };
  });
  return { citationNumbers, references, hasReferenceHeading: headingIndex >= 0 };
}

export function validateScienceReferences(parsed) {
  const errors = [];
  if (!parsed.hasReferenceHeading) errors.push('缺少“## 参考文献”标题。');
  const numbers = parsed.references.map((item) => item.number);
  const expected = Array.from({ length: numbers.length }, (_, index) => index + 1);
  if (numbers.join(',') !== expected.join(',')) {
    errors.push(`参考文献编号必须从 1 连续排列；当前为 ${numbers.join(', ') || '空'}。`);
  }
  const numberSet = new Set(numbers);
  const citationSet = new Set(parsed.citationNumbers);
  for (const number of parsed.citationNumbers) {
    if (!numberSet.has(number)) errors.push(`正文引用 [${number}] 没有对应条目。`);
  }
  for (const reference of parsed.references) {
    if (!citationSet.has(reference.number)) errors.push(`参考文献 [${reference.number}] 未在正文使用。`);
    if (!reference.pmid && !reference.pmcid && !reference.doi) {
      errors.push(`参考文献 [${reference.number}] 缺少 PMID、PMCID 或 DOI。`);
    }
  }
  return errors;
}

const chunks = (values, size) => Array.from({ length: Math.ceil(values.length / size) }, (_, index) => values.slice(index * size, (index + 1) * size));

export const buildDoiVerificationUrl = (doi) => `https://api.crossref.org/works/${encodeURIComponent(doi)}`;

export async function verifyScienceReferencesOnline(references) {
  const errors = [];
  const pmids = references.map((item) => item.pmid).filter(Boolean);
  for (const group of chunks(pmids, 50)) {
    const url = new URL('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi');
    url.search = new URLSearchParams({ db: 'pubmed', id: group.join(','), retmode: 'json' }).toString();
    const response = await fetch(url, { headers: { 'User-Agent': 'EnjoyLife-reference-check/1.0' } });
    if (!response.ok) throw new Error(`NCBI PMID 校验请求失败：HTTP ${response.status}`);
    const payload = await response.json();
    const found = new Set(payload.result?.uids ?? []);
    for (const pmid of group) if (!found.has(pmid)) errors.push(`PMID ${pmid} 无法在 PubMed 解析。`);
  }

  for (const reference of references.filter((item) => item.pmcid)) {
    const response = await fetch(`https://www.ncbi.nlm.nih.gov/pmc/articles/${reference.pmcid}/`, {
      method: 'HEAD', headers: { 'User-Agent': 'EnjoyLife-reference-check/1.0' }, redirect: 'follow',
    });
    if (!response.ok) errors.push(`PMCID ${reference.pmcid} 无法解析：HTTP ${response.status}。`);
  }

  for (const reference of references.filter((item) => item.doi)) {
    const response = await fetch(buildDoiVerificationUrl(reference.doi), {
      headers: { 'User-Agent': 'EnjoyLife-reference-check/1.0' },
    });
    if (!response.ok) errors.push(`DOI ${reference.doi} 无法解析：HTTP ${response.status}。`);
  }
  return errors;
}

async function main() {
  const markdown = await readFile(articleUrl, 'utf8');
  const parsed = parseScienceReferences(markdown);
  const errors = validateScienceReferences(parsed);
  if (process.argv.includes('--online') && errors.length === 0) {
    errors.push(...await verifyScienceReferencesOnline(parsed.references));
  }
  if (errors.length > 0) {
    for (const error of errors) console.error(`ERROR\t${error}`);
    process.exitCode = 1;
    return;
  }
  const identifiers = parsed.references.filter((item) => item.pmid || item.pmcid || item.doi).length;
  console.log(`Science references passed: ${parsed.references.length} entries, ${identifiers} identifiers${process.argv.includes('--online') ? ' verified online' : ''}.`);
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  await main();
}
