import type { CollectionEntry } from 'astro:content';

export const MIN_PUBLIC_TAG_COUNT = 1;

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

// Astro dynamic-route parameters must remain inside one path segment. Characters
// such as "/" would otherwise be interpreted as an extra directory level. Escape
// path-unsafe ASCII characters while keeping ordinary Chinese and English tags
// readable. A literal "~" is escaped first, so decoding remains unambiguous.
const TAG_PARAM_UNSAFE = /[~<>:"/\\|?*%#\u0000-\u001f\u007f]/g;

function escapeTagParamCharacter(character: string) {
  return `~${character.codePointAt(0)!.toString(16).toUpperCase().padStart(2, '0')}`;
}

export function encodeTagParam(tag: string) {
  const trimmed = tag.trim();
  const escaped = trimmed.replace(TAG_PARAM_UNSAFE, escapeTagParamCharacter);

  // Windows cannot create paths ending in a dot or a space. Keep ordinary dots
  // and spaces readable, but escape them when they occur at the end of a tag.
  return escaped.replace(/[. ]+$/u, (tail) => [...tail].map(escapeTagParamCharacter).join(''));
}

export function tagHref(tag: string) {
  return `/tags/${encodeURIComponent(encodeTagParam(tag))}/`;
}

export function decodeTagParam(value: string | undefined) {
  if (!value) return '';
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    // Keep Astro's original parameter when it is already decoded or malformed.
  }
  return decoded.replace(/~([0-9A-F]{2})/g, (_, hex: string) => String.fromCodePoint(Number.parseInt(hex, 16)));
}
