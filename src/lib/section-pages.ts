import { getCollection, type CollectionEntry } from 'astro:content';

type SectionPage = CollectionEntry<'sectionPages'>;
type Parent = 'technology' | 'tools' | 'reading' | 'nature' | 'life';

export function matchesWritingSectionPage(entry: CollectionEntry<'writing'>, page: SectionPage) {
  const { writingSectionPrefix, writingSections } = page.data;
  if (writingSectionPrefix && !entry.data.section.startsWith(`${writingSectionPrefix}/`)) return false;
  if (writingSections.length > 0 && !writingSections.includes(entry.data.section)) return false;
  return true;
}

function isPublishedNature(entry: CollectionEntry<'nature'>): entry is CollectionEntry<'nature'> & { data: Extract<CollectionEntry<'nature'>['data'], { draft: false }> } {
  return entry.data.draft === false;
}

function isPublishedBook(entry: CollectionEntry<'books'>): entry is CollectionEntry<'books'> & { data: Extract<CollectionEntry<'books'>['data'], { draft: false }> } {
  return entry.data.draft === false;
}

export async function getVisibleSectionPageEntries(section: Parent) {
  const [pages, writing, tools, nature, books] = await Promise.all([
    getCollection('sectionPages', ({ data }) => !data.draft && data.section === section),
    getCollection('writing', ({ data }) => !data.draft),
    getCollection('tools', ({ data }) => !data.draft),
    getCollection('nature'),
    getCollection('books'),
  ]);

  const visible = pages.filter((page) => {
    if (page.data.showInMap) return true;
    if (page.data.kind === 'writing') return writing.some((entry) => matchesWritingSectionPage(entry, page));
    if (page.data.kind === 'tools') return tools.some((entry) => page.data.toolCategories.includes(entry.data.category));
    if (page.data.kind === 'nature') return nature.some((entry) => isPublishedNature(entry) && page.data.natureCategories.includes(entry.data.category));
    if (page.data.kind === 'books') return books.some((entry) => isPublishedBook(entry) && page.data.bookStatuses.includes(entry.data.status));
    return false;
  });

  return visible.sort((a, b) => a.data.order - b.data.order);
}

export async function getVisibleSectionPages(section: Parent) {
  const visible = await getVisibleSectionPageEntries(section);
  return visible.map((entry) => ({
    title: entry.data.title,
    description: entry.data.description,
    href: `/${entry.data.section}/${entry.data.routeSlug}/`,
  }));
}
