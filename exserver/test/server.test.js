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
test('Express routes, methods, parameters and queries', async t => {
  const base = await start(t, 'index.js');
  for (const [method, route, body] of [
    ['GET', '/', 'Hello, Node'], ['GET', '/users', 'Get all users'],
    ['POST', '/users', 'Create new user'],
    ['GET', '/users/apple', 'apple 사용자 정보 요청'],
    ['GET', '/users/carrot?name=aaa', 'carrot 사용자 정보 요청'],
    ['GET', '/users/' + encodeURIComponent('허강익'), '허강익 사용자 정보 요청']
  ]) {
    const response = await fetch(base + route, { method });
    assert.equal(response.status, 200, method + ' ' + route);
    assert.equal(await response.text(), body);
  }
  for (const [method, route] of [['PUT', '/users'], ['GET', '/missing']]) {
    const response = await fetch(base + route, { method });
    assert.equal(response.status, 404);
    assert.match(await response.text(), /Cannot/);
  }
});
test('sendFile uses script-relative path', async t => {
  const base = await start(t, 'file-server.js');
  const response = await fetch(base);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /text\/html/);
  assert.match(await response.text(), /<h1>Hello, Node!<\/h1>/);
});
