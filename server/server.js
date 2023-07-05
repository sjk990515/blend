// express 로드
const express = require('express');
const app = express();

// port 번호
const port = 3000;

// post로 데이터가 들어오면 json 형태로 변환
app.use(express.urlencoded({extended:false}));

// view 파일 기본경로 설정
app.set('views',__dirname + '/views');

// view engine 설정
app.set('view engine', 'ejs');



// dotenv 설정
require('dotenv').config();





// express-session 모듈 로드
const session = require('express-session')
// session 설정
app.use(session(
    {
        secret : process.env.secret,
        resave : false,
        saveUninitialized : false,
        cookie : {
            maxAge : 300000 // 1000당 1초
        }
    }
))



// 외부의 js, css와 같은 정적 파일의 기본 경로를 설정
app.use(express.static('public'))



// 임시 메인 경로,  URI 지정 필요 그대로 써도 상관없음
// app.get('/',function(req,res){
//     if(!req.session.logined){
//         res.redirect('/member/login')
//     }else{
//         console.log(req.session)
//         res.send({ 
//             'user' : req.session.logined
//         })
//     }
// })

const main = require("./routes/main.js");
app.use("/main",main);


const member = require("./routes/member.js")()
app.use("/member",member)

const server = app.listen(port,function(){
    console.log(port,"Server Start")
})