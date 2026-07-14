import type { CollectionEntry } from 'astro:content';

export const MIN_PUBLIC_TAG_COUNT = 2;

export type TagCount = { tag: string; count: number };

export function getTagCounts(entries: CollectionEntry<'writing'>[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    for (const tag of entry.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return counts;
}

export function getPublicTags(entries: CollectionEntry<'writing'>[]): TagCount[] {
  return [...getTagCounts(entries)]
    .filter(([, count]) => count >= MIN_PUBLIC_TAG_COUNT)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'zh-CN'));
}

export function getPublicTagSet(entries: CollectionEntry<'writing'>[]): Set<string> {
  return new Set(getPublicTags(entries).map(({ tag }) => tag));
}

export function tagHref(tag: string) {
  return `/tags/${encodeURIComponent(tag)}/`;
}

export function decodeTagParam(value: string | undefined) {
  if (!value) return '';
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
