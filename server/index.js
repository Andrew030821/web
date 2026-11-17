const http = require('node:http');
const PORT = Number(process.env.PORT) || 3000;

// 두 번째 강의: 요청 메서드와 URL에 따라 응답을 분기합니다.
const server = http.createServer((req, res) => {
  const { method, url } = req;
  console.log(method, url);
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  if (method === 'POST' && url === '/home') {
    res.statusCode = 200;
    res.end('HOME');
  } else if (method === 'GET' && url === '/about') {
    res.statusCode = 200;
    res.end('ABOUT');
  } else {
    res.statusCode = 404;
    res.end('NOT FOUND');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`${PORT}번 포트로 서버 실행`);
});
