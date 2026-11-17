const express = require('express');
const app = express();
const PORT = Number(process.env.PORT) || 3000;

// 세 번째 강의: 메서드와 경로별로 콜백을 등록합니다.
app.get('/', (req, res) => {
  res.status(200).send('Hello, Node');
});
app.get('/users', (req, res) => {
  res.status(200).send('Get all users');
});
app.post('/users', (req, res) => {
  // 이번 강의는 라우팅 응답까지이며 실제 DB 저장은 이후 수업 범위입니다.
  res.status(200).send('Create new user');
});
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  console.log('body:', req.body);
  console.log('params:', req.params);
  console.log('query:', req.query);
  res.status(200).send(`${userId} 사용자 정보 요청`);
});

// 등록하지 않은 경로/메서드는 Express 기본 404 응답으로 처리됩니다.
app.listen(PORT, '0.0.0.0', () => {
  console.log(`${PORT}번 포트로 서버 실행`);
});
