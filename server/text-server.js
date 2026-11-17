const http = require('node:http');
const PORT = Number(process.env.PORT) || 3000;

// 첫 번째 강의: 텍스트 응답과 응답 종료.
http.createServer((req, res) => {
  console.log('요청 발생', req.method);
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.write('Hello, Node');
  res.end();
}).listen(PORT, '0.0.0.0', () => console.log(`${PORT}번 포트로 서버 실행`));
