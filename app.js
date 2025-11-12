import express from 'express'; // express 모듈 가져오기
import authRouter from './routes/auth.router.js';
import usersRouter from './routes/users.router.js';
import { eduTest, eduUsersTest } from './app/middlewares/edu/edu.middleware.js';
import { errorHandler } from './app/middlewares/errors/error-handler.js';

const app = express();
app.use(express.json()); // JSON으로 요청이 올 경우 파싱 처리
app.use(eduTest); // 커스텀 미들웨어 전역 등록

// 클라이언트가 '/api/hi' 경로로 GET 요청을 보낼 때 실행되는 Router
app.get('/api/hi', (request, response, next) => {
  //.send 매소드 : 마지막에 실행되며 유저에게 응답함
  response.status(200).send({
    code: '00',
    msg: '안녕 익스프레스!',
  });
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
// 전송값이 많지 않고 get일 때만 사용
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
// 하나의 값만 필요할 때(ex.상세게시글 받아올 때)
// `Request.params` 를 통해서 접근 가능
app.get('/api/posts/:id', (request, response, next) => {
  const postId = request.params.id;
  console.log(typeof(postId));
  response.status(200).send(postId);
});

// JSON 요청 제어
// `Request.body`를 통해서 접근 가능(** express.json() 추가 필요 **)
app.post('/api/posts', (request, response, next) => {
  const {account, password, name} = request.body;
  response.status(200).send({password, account, name});

  // const account = request.body.account;
  // const password = request.body.password;
  // const name = request.body.name;
  // response.status(200).send({
  //   password: password
  //   ,account: account
  //   ,name: name
  // })
});

// ---------------
// 라우트 그룹
// ---------------
// 라우트를 모듈로 나누고 그룹핑하여 관리
app.use('/api', authRouter);
app.use('/api/users', eduUsersTest, usersRouter);

// 에러 테스트용 라우트
app.get('/error', (request, response, next) => {
  // `throw`를 이용하여 에러 핸들링 처리도 가능 (비동기 처리 내부에서는 사용하면 에러 핸들러가 핸들링 못함)
  // throw new Error('쓰로우로 예외 발생');

  // 비동기 처리 내부에서는 반드시 `next(error)`를 이용해야 서버 carshed 안 일어남
  setTimeout(() => {
    next(new Error('쓰로우로 예외 발생'));
  }, 1000);
})

// -------------------------------------------------
// 대체 라우트(모든 라우터 중에 가장 마지막에 작성)
// use : 모든 경로를 받음
app.use((request, response, next) => {
  response.status(404).send({
    code: 'E01',
    msg: '찾을 수 없는 페이지입니다.'
  });  
});

// ----------------------
// Error Handler 등록
// ----------------------
app.use(errorHandler);

// 서버를 주어진 포트에서 시작
app.listen(3000);