//express 로드
const express = require('express');
const coolsms = require('coolsms-node-sdk').default;

// apiKey, apiSecret 설정
const messageService = new coolsms('NCSEZDM0KDIMDV92', 'XJ34ZHHYXV3WPGQXA4XQOGWEVDUX3GA0');

// Router() 변수에 대입
const router = express.Router();

const token = require('../Token/kip7.js');

const mysql = require('mysql2');
const connection = mysql.createConnection({
   host: process.env.host,
   port: process.env.port,
   user: process.env.user,
   password: process.env.password,
   database: process.env.database,
});

// moment 모듈 로드
const moment = require('moment');
let date = moment();

// 파일 업로드
const multer = require('multer');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/upload/');
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   },
});

const upload = multer({
   storage: storage,
});

// 난수생성기
function generateRandomCode(n) {
   let str = '';
   for (let i = 0; i < n; i++) {
      str += Math.floor(Math.random() * 10);
   }
   return str;
}

// 컨트렉트 연동

// baobab network에 배포된 컨트렉트를 연동하기 위한 모듈을 로드
const Caver = require('caver-js');

//컨트렉트의 정보 로드
const contract_info = require('../build/contracts/Mileage.json');

// baobab 네트워크 주소를 입력
const caver = new Caver('https://api.baobab.klaytn.net:8651');

// 배포된 컨트렉트를 연동
const smartcontract = new caver.klay.Contract(contract_info.abi, contract_info.networks['1001'].address);

// 수수료를 지불할 지갑을 등록
const account = caver.klay.accounts.createWithAccountKey(process.env.public_key, process.env.private_key);

caver.klay.accounts.wallet.add(account);

//토큰 생성
//token.create_token('Beans','BNS',0,1000000000)

module.exports = function () {
   // 기본경로 : localhost:3000/member

   // localhost:3000/member 요청 시
   //    router.get("/", async function (req, res) {});

   // localhost:3000/member/join [get] 회원가입 폼
   //    router.get("/join", async function (req, res) {
   //        res.render("join.ejs");
   //    });

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
   router.post('/joinSet', async function (req, res) {
      try {
         const input_id = req.body._id;
         const input_pass = req.body._pass;
         const input_name = req.body._name;
         const input_birth = req.body._birth;
         const input_email = req.body._email;
         const input_wallet = await token.create_wallet();
         const input_auth = 1;

         // 지갑 주소를 컨트랙트에 등록
         const addContract = await smartcontract.methods.add_user(input_wallet).send({
            from: account.address,
            gas: 2000000,
         });
         console.log(addContract);

         console.log('## joinSet input_Data : ' + input_id, input_pass, input_birth);

         const sql = `
            insert
            into
            member
            (MEMBER_ID,
            MEMBER_PASSWORD,
            MEMBER_NAME,
            MEMBER_BIRTH,
            MEMBER_EMAIL,
            MEMBER_WALLET,
            MEMBER_AUTH
            )
            values
            (?,?,?,?,?,?,?)
        `;
         const values = [input_id, input_pass, input_name, input_birth, input_email, input_wallet, input_auth];

         connection.query(sql, values, function (err, result) {
            if (err) {
               console.log(err);
               res.send(err);
            } else {
               console.log(result);
               res.json({ message: 'Y' });
            }
         });
      } catch (e) {
         console.error(e);
      }
   });

   // localhost:3000/member/smsAuth [post] Ajax sms인증
   router.post('/smsAuth', async function (req, res) {
      //확인 후 난수 데이터 보낼줄 것
      // const abc = Object.keys(req.body)[0];
      // const aaa = JSON.parse(req.body);
      console.log(req.body);
      const input_id = req.body._id;

      let authNum = generateRandomCode(4);
      console.log(authNum);
      const phonetext = '[Blend]Blend에서 인증번호를 발송해드립니다. 당신의 인증번호는 [' + authNum + '] 입니다.';
      const resNum = { auth_Num: authNum };

      console.log('## text : ' + phonetext);

      const SQL = `
        select
        *
        from
        member
        where
        MEMBER_ID = ?
        `;

      const values = [input_id];

      connection.query(SQL, values, function (err, result) {
         if (err) {
            console.log(err);
            res.send(err);
         } else {
            console.log('## ID check : ' + result);
            if (result.length == 0) {
               // 2건 이상의 메시지를 발송할 때는 sendMany, 단일 건 메시지 발송은 sendOne을 이용해야 합니다.
               messageService
                  .sendMany([
                     {
                        to: input_id,
                        from: '01062826010',
                        text: phonetext,
                     },
                  ])
                  .then(res => console.log(res))
                  .catch(err => console.error(err));
               res.json(resNum);
            } else {
               console.log('중복됨');
               res.json({ auth_Num: '0' });
            }
         }
      });
   });
   // localhost:3000/member/login [get] 로그인 등록
   //    router.get("/login", async function (req, res) {
   //        res.render("login.ejs");
   //    });
   router.post('/session', function (req, res) {
      console.log('## sessionID : ' + req.sessionID);
      if (!req.session.logined) {
         res.send({ result: false });
      } else {
         console.log(req.session);
         res.send({ result: true }); // 리액트에 맞게수정 -> res.send({ 'user' : req.session.logined})
      }
   });

   // localhost:3000/member/checkLogin [post] 로그인 유효성검사
   router.post('/checkLogin', function (req, res) {
      const input_id = req.body._id;
      const input_pass = req.body._pass;
      console.log('## checkLogin : ' + input_id, input_pass);

      const sql = `
        select
        *
        from
        member
        where
        MEMBER_ID = ?
        and
        MEMBER_PASSWORD = ?
        `;

      const values = [input_id, input_pass];

      connection.query(sql, values, function (err, result) {
         if (err) {
            console.log(err);
            res.send(err);
         } else {
            console.log('## checkLogin : ' + result);
            if (result.length != 0) {
               req.session.logined = result[0];
               res.send({
                  result: true,
                  user: req.session.logined,
               }); // 메인으로 가는 경로 정해지면 바꿔주세요
            } else {
               console.log('## checkLogin : ' + result);
               if (result.length != 0) {
                  const user = result[0];
                  delete user['MEMBER_PASSWORD'];
                  res.send({
                     user: user,
                     result: true,
                  });
               } else {
                  res.send({ result: false });
               }
            }
         }
      });
   });

   router.get('/logout', async function (req, res) {
      req.session.destroy(function () {
         req.session;
      });
      res.send({ result: 'delete' });
   });

   // localhost:3000/member/myPage [get] mypage에 유저 정보 불러오기
   router.get('/myPage', function (req, res) {
      const user_info = req.query.MEMBER_NUM;
      res.json({
         data: user_info,
      });
   });

   // localhost:3000/member/editView [get] 회원정보 수정 페이지, 세션에 저장된 회원 정보 불러오기
   router.get('/editView', function (req, res) {
      res.json({
         // TODO 리액트 연결하면서 코드 수정 필요 → 일단 json 파일로 보내기
         data: req.query.MEMBER_NUM,
      });
   });

   // localhost:3000/member/edit [post] 회원정보 수정(DB 업데이트 및 세션 정보 수정)
   router.post('/edit', upload.single('_profile'), function (req, res) {
      console.log(req.body);
      const input_profile = req.file.filename;
      const input_id = req.body._id;
      const input_name = req.body._name;
      const input_birth = req.body._birth;
      const input_email = req.body._email;
      const input_pass = req.body._pass;
      console.log(input_profile, input_id, input_name, input_birth, input_email, input_pass);

      // 회원정보 업데이트 (DB에 UPDATE)
      const sql = `
       update member 
       set member_id = ?, 
       member_password = ?, 
       member_name = ?, 
       member_birth = ?, 
       member_email = ?, 
       member_profile = ? 
       where member_num = ?;
       `;
      const values = [input_id, input_pass, input_name, input_birth, input_email, input_profile, req.body.MEMBER_NUM];

      connection.query(sql, values, function (err, result) {
         if (err) {
            console.log(err);
            res.send(err);
         } else {
            // 정보 수정(update 성공 시)한 후 DB에 업데이트 된 로그인 정보 조회(select)
            const selectSql = `
                select
                *
                from
                member
                where
                MEMBER_ID = ?
                and
                MEMBER_PASSWORD = ?
                `;

            const selectValues = [input_id, input_pass];

            connection.query(selectSql, selectValues, async function (err, selectResult) {
               if (err) {
                  console.log(err);
                  res.send(err);
               } else {
                  // 업데이트 된 DB 데이터를 세션에 새로 넣어준 후 myPage로 redirect
                  console.log('## checkLogin : ' + selectResult);
                  if (selectResult.length != 0) {
                     console.log('## result[0]: ' + selectResult[0]);
                     req.body.MEMBER_NUM = selectResult[0];
                     res.redirect('/member/myPage');
                  } else {
                     res.redirect('../');
                  }
               }
            });
         }
      });
   });

   return router;
};
