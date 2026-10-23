import { readFile, writeFile } from 'node:fs/promises';

const template = await readFile(new URL('../playground/index.html', import.meta.url), 'utf8');
await writeFile(
  new URL('../index.html', import.meta.url),
  template.replaceAll('../dist/', 'dist/').replaceAll('../playground/', 'playground/'),
);
console.log('GitHub Pages: index.html обновлён из playground/index.html');
