// express 로드
const express = require('express');
const app = express();

// post로 데이터가 들어오면 json 형태로 변환
var bodyParser = require('body-parser');

app.use(bodyParser());
// app.use(express.json());

const cors = require('cors');
const corsOptions = {
   origin: true,
   credentials: true,
};

app.use(cors(corsOptions));

// port 번호
const port = 4000;

// post로 데이터가 들어오면 json 형태로 변환
// app.use(express.urlencoded({ extended: false }));

// view 파일 기본경로 설정
app.set('views', __dirname + '/Test');

// view engine 설정
app.set('view engine', 'ejs');

// dotenv 설정
require('dotenv').config();

// express-session 모듈 로드
const session = require('express-session');
// session 설정
app.use(
   session({
      secret: process.env.secret,
      resave: false,
      saveUninitialized: true,
      cookie: {
         httpOnly: true,
         sameSite: 'none',
         maxAge: 300000, // 1000당 1초
         secure: true,
      },
   }),
);

// 외부의 js, css와 같은 정적 파일의 기본 경로를 설정
app.use(express.static('public'));

const main = require('./Router/main.js')();
app.use('/main', main);

const member = require('./Router/member.js')();
app.use('/member', member);

//const token = require("./Router/token.js")()
//app.use("/token",token)

const trade = require('./Router/trade.js')();
app.use('/trade', trade);

const server = app.listen(port, function () {
   console.log(port, 'Server Start');
});
