import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

async function installWorker(cache) {
  const source = (await readFile(new URL('../../public/service-worker.js', import.meta.url), 'utf8'))
    .replace("'__LIFEOS_BUILD_ASSETS__'", JSON.stringify(['/assets/app-test.js', '/assets/app-test.css']));
  const listeners = {};
  const warnings = [];
  runInNewContext(source, {
    self: { addEventListener: (name, callback) => { listeners[name] = callback; } },
    caches: { open: async () => cache },
    console: { warn: (...args) => warnings.push(args) },
  });
  let installation;
  listeners.install({ waitUntil: (promise) => { installation = promise; } });
  return { installation, warnings };
}

test('service worker caches build assets and tolerates unavailable optional pages', async () => {
  let shell;
  const { installation, warnings } = await installWorker({
    addAll: async (urls) => { shell = Array.from(urls); },
    add: async (url) => { if (url === '/Bible.html') throw new Error('unavailable'); },
  });
  await installation;
  assert.ok(shell.includes('/index.html'));
  assert.ok(shell.includes('/assets/app-test.js'));
  assert.ok(shell.includes('/assets/app-test.css'));
  assert.equal(warnings.length, 1);
});

test('service worker fails installation if the essential shell cannot be cached', async () => {
  const { installation } = await installWorker({
    addAll: async () => { throw new Error('shell unavailable'); },
    add: async () => {},
  });
  await assert.rejects(installation, /shell unavailable/);
});
