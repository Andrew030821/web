const express = require('express');
const path = require('node:path');
const app = express();
const PORT = Number(process.env.PORT) || 3000;

// 강의 마지막 슬라이드: sendFile로 HTML 파일을 전송합니다.
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'index.html'));
});
app.listen(PORT, '0.0.0.0', () => console.log(`${PORT}번 포트로 서버 실행`));
