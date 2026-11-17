const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const PORT = Number(process.env.PORT) || 3000;

// 두 번째 강의: 파일을 스트림으로 읽어 응답에 연결합니다.
http.createServer((req, res) => {
  const stream = fs.createReadStream(path.join(__dirname, 'index.html'), 'utf8');
  stream.on('error', () => {
    if (!res.headersSent) res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('파일을 읽을 수 없습니다.');
  });
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  stream.pipe(res);
}).listen(PORT, '0.0.0.0', () => console.log(`${PORT}번 포트로 서버 실행`));
