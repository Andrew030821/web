# 12주차 Express 서버 실습

npm ci 후 npm start로 실행합니다.

- GET / → 200 Hello, Node
- GET /users → 200 Get all users
- POST /users → 200 Create new user
- GET /users/apple → 200 apple 사용자 정보 요청
- GET /users/carrot?name=aaa → 파라미터와 쿼리를 터미널에서 확인
- 등록하지 않은 경로/메서드 → Express 기본 404

사용자 조회/생성 응답은 라우팅 연습용 문구이며 실제 사용자 데이터나 DB를 변경하지 않습니다. 미들웨어와 DB 연동은 이번 세 영상의 실습 범위에 포함되지 않습니다.

마지막 sendFile 슬라이드는 npm run start:file로 실행합니다.

Render 설정: Node, main 브랜치, Singapore, Root Directory exserver, Build npm ci, Start npm start, Free 인스턴스, 환경변수 PORT=3000.

테스트: npm test.
