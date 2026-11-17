# 12주차 HTTP 서버 실습

- 첫 번째 강의: npm run start:text (텍스트 응답)
- 두 번째 강의 HTML 전송: npm run start:html (createReadStream / pipe)
- 두 번째 강의 최종 라우팅: npm start

최종 라우팅은 POST /home → 200 HOME, GET /about → 200 ABOUT이며 나머지는 404 NOT FOUND입니다. 따라서 최종 서버의 루트 /에 404가 표시되는 것은 강의 예제대로의 동작입니다.

Render 설정: Node, main 브랜치, Singapore, Root Directory server, Build npm ci, Start npm start, Free 인스턴스, 환경변수 PORT=3000. 확인 주소는 배포 URL 뒤에 /about을 붙입니다.

테스트: npm test. 두 서버를 동시에 실행할 경우 서로 다른 PORT를 사용합니다.
