//express 로드
const express = require('express');



// Router() 변수에 대입
const router = express.Router();


const mysql = require('mysql2')
const connection = mysql.createConnection({
        host : process.env.host ,
        port : process.env.port ,
        user : process.env.user ,
        password : process.env.password ,
        database : process.env.database 
    }
)


// moment 모듈 로드
const moment = require('moment');
let date = moment();

// 파일 업로드
const multer = require('multer');

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'public/upload/');
    },
    filename : function(req,file,cb){
        cb(null,file.originalname)
    }
})


const upload = multer({
    storage : storage
})



module.exports = function(){
    // 기본경로 : localhost:3000/member

    // localhost:3000/member 요청 시
    router.get("/", async function(req,res){
    
    })

    // localhost:3000/member/join [get] 회원가입 폼
    router.get("/join", async function(req,res){
        res.render('join.ejs')
    })




    // member table column
    /*
    MEMBER_NUM,            // PK, auto increment
    MEMBER_ID,
    MEMBER_PASSWORD,
    MEMBER_BIRTH
    MEMBER_WALLET
    MEMBER_PROFILE          // 기본 아이콘 path defualt 설정
    */
    // localhost:3000/member/joinSet [post] 회원가입 등록
    router.post("/joinSet",function(req,res){
        const input_id = req.body._id;
        const input_pass = req.body._pass;
        const input_birth = req.body._birth
        // const input_wallet = req.body._wallet
        console.log("## joinSet input_Data : " + input_id,input_pass,input_birth)

        const sql=
        `
            insert
            into
            member
            (MEMBER_ID,
            MEMBER_PASSWORD,
            MEMBER_BIRTH)
            values
            (?,?,?)
        `;
        const values = [input_id,input_pass,input_birth];

        connection.query(sql, values, function (err,result){
            if(err){
                console.log(err);
                res.send(err);
            } else {
                console.log(result);
                res.redirect('/member/login');
            }
        });
    });



    // localhost:3000/member/checkId [post] Ajax아이디 중복체크
    router.post("/checkId", async function(req,res){
        r
    })


    // localhost:3000/member/smsAuth [post] Ajax sms인증
    router.post("/smsAuth", async function(req,res){
        //확인 후 난수 데이터 보낼줄 것
    })


    // localhost:3000/member/login [get] 회원가입 등록
    router.get("/login", async function(req,res){
        res.render('login.ejs') 
       
    })




    // localhost:3000/member/checkLogin [post] 로그인 유효성검사
    router.post("/checkLogin",function(req,res){
        const input_id = req.body._id;
        const input_pass = req.body._pass;
        console.log("## checkLogin : "+input_id,input_pass);

        const sql = 
        `
        select
        *
        from
        member
        where
        MEMBER_ID = ?
        and
        MEMBER_PASSWORD = ?
        `

        const values= [input_id,input_pass]

        connection.query(sql,values,function(err,result){
            if(err){
                console.log(err);
                res.send(err);
            }else{
                console.log("## checkLogin : " + result);
                if(result.length != 0){
                    req.session.logined= result[0]
                    res.redirect("../");           // 메인으로 가는 경로 정해지면 바꿔주세요
                }else{
                    res.redirect("/member/login");
                }
            }
        })
    })

    router.get("/logout", async function(req,res){
        req.session.destroy(function(){ 
            req.session;
        });
        
        res.redirect("../");
            
    })

    
    return router;
}
