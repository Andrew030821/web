const { test } = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const net = require('node:net');
const path = require('node:path');
const { once } = require('node:events');
async function start(t, file) {
  const probe = net.createServer();
  probe.listen(0, '127.0.0.1');
  await once(probe, 'listening');
  const port = probe.address().port;
  await new Promise(resolve => probe.close(resolve));
  const child = spawn(process.execPath, [path.join(__dirname, '..', file)], {
    cwd: '/tmp', env: { ...process.env, PORT: String(port) }, stdio: ['ignore', 'pipe', 'pipe']
  });
  t.after(() => child.kill());
  await Promise.race([
    once(child.stdout, 'data'),
    once(child, 'exit').then(([code]) => { throw new Error('Server exited: ' + code); }),
    new Promise((_, reject) => { const timer = setTimeout(() => reject(new Error('Startup timeout')), 10000); timer.unref(); })
  ]);
  return 'http://127.0.0.1:' + port;
}
test('HTTP method/path routing and 404', async t => {
  const base = await start(t, 'index.js');
  for (const [method, route, status, body] of [
    ['POST', '/home', 200, 'HOME'], ['GET', '/about', 200, 'ABOUT'],
    ['GET', '/home', 404, 'NOT FOUND'], ['POST', '/about', 404, 'NOT FOUND'],
    ['GET', '/', 404, 'NOT FOUND'], ['GET', '/missing', 404, 'NOT FOUND']
  ]) {
    const response = await fetch(base + route, { method });
    assert.equal(response.status, status, method + ' ' + route);
    assert.equal(await response.text(), body);
  }
});
test('plain text response', async t => {
  const base = await start(t, 'text-server.js');
  const response = await fetch(base);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /text\/plain/);
  assert.equal(await response.text(), 'Hello, Node');
});
test('HTML stream uses script-relative path', async t => {
  const base = await start(t, 'html-server.js');
  const response = await fetch(base);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /text\/html/);
  assert.match(await response.text(), /<h1>Hello, Node!<\/h1>/);
});
