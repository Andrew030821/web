// http 모듈 불러오기
const http = require("http");

// 서버 생성
const server = http.createServer((req,res) => {
    console.log("요청 발생");
    //console.log(req);
    console.log(req.method);

    // 응답 헤더
    res.setHeader("Content-Type", "text/plain");

    // 바디 전송
    res.write("Hello, Node");
    res.end(); // 응답 종료
});

// 서버 실행
server.listen(3000, () => {
    console.log("3000번 포트로 서버 실행");
});