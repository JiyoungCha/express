import express from 'express'; // express 모듈 가져오기

const app = express();

// 클라이언트가 '/' 경로로 GET 요청을 보낼 때 실행되는 Router
app.get('/api/hi', (request, response, next) => {
  //.send 매소드 : 마지막에 실행되며 유저에게 응답함
  response.status(200).send('Hello, Express!');
});

// 클라이언트가 '/' 경로로 POST 요청을 보낼 때 실행되는 Router
app.post('/api/hi', (request, response, next) => {
  response.status(200).send('POST Express!');
});

// 클라이언트가 '/' 경로로 PUT 요청을 보낼 때 실행되는 Router
app.put('/api/hi', (request, response, next) => {
  response.status(200).send('PUT Express!');
});

// 클라이언트가 '/' 경로로 DELETE 요청을 보낼 때 실행되는 Router
app.delete('/api/hi', (request, response, next) => {
  response.status(200).send('DELETE Express!');
});

// -------------------------------------------------
// Query Parameter 제어
// Request.query 프로퍼티를 통해서 접근 가능
// 모든 값을 string으로 받기 때문에 주의 필요
app.get('/api/posts', (request, response, next) => {
  const params = request.query;
  const name = request.query.name;
  const age = request.query.age;
  console.log(name, age);
  response.status(200).send(params);
});

// Segment Parameter
// `Request.params` 를 통해서 접근 가능
app.get('/api/posts/:id', (request, response, next) => {
  const postId = request.params.id;
  console.log(typeof(postId));
  response.status(200).send(postId);
});

// -------------------------------------------------
// 대체 라우트(모든 라우터 중에 가장 마지막에 작성)
// use : 모든 경로를 받음
app.use((request, response, next) => {
  response.status(404).send({
    code: 'E01',
    msg: '찾을 수 없는 페이지입니다.'
  });  
});

// 서버를 주어진 포트에서 시작
app.listen(3000);