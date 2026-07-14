/**
 * Remove a single retired internal validation draft that may survive when a user
 * overlays a newer release on top of an older checkout.
 *
 * This is intentionally narrow: it only touches the former synthetic
 * `site-notes.md` file and never scans, rewrites, or deletes user-authored posts.
 */
import { access, rm } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const retiredDraft = path.join(projectRoot, 'src', 'content', 'writing', 'site-notes.md');

try {
  await access(retiredDraft, constants.F_OK);
  await rm(retiredDraft, { force: true });
  console.log('Removed retired internal draft: src/content/writing/site-notes.md');
} catch (error) {
  if (error?.code === 'ENOENT') {
    console.log('No retired internal draft found.');
  } else {
    throw error;
  }
}
