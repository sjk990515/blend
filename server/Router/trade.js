// express 로드
const express = require('express');
// Router() 변수에 대입
const router = express.Router();

// 컨트랙트의 정보 로드
const contract_info = require('../build/contracts/Mileage.json');

// caver-js 로드
const Caver = require('caver-js');
// 바오밥 네트워크 주소 입력
const caver = new Caver('https://api.baobab.klaytn.net:8651');

const smartcontract = new caver.klay.Contract(contract_info.abi, contract_info.networks['1001'].address);

// 수수료를 지불할 지갑을 등록
const account = caver.klay.accounts.createWithAccountKey(process.env.public_key, process.env.private_key);

caver.klay.accounts.wallet.add(account);

// DB 연결
const mysql = require('mysql2');
const connection = mysql.createConnection({
   host: process.env.host,
   port: process.env.port,
   user: process.env.user,
   password: process.env.password,
   database: process.env.database,
});

module.exports = function () {
   // api 생성
   // 해당 파일의 api의 기본 경로: localhost:4000/trade

   // // localhost:4000/checkMember [get] 컨트랙트에 등록된 유저인지 확인
   // router.get('/checkMember', function (req, res) {
   //    const input_id = req.query.id;
   //    const input_amount = req.query._amount;
   //    console.log('## 회원번호 확인: ' + input_id);

   //    smartcontract.methods
   //       .view_users(input_id)
   //       .call()
   //       .then(function (result) {
   //          // 컨트랙트에 등록된 회원이 확인되면 마일리지 송금 페이지로 보내준다
   //          if (result[0] == input_id) {
   //             res.render('/selectMember', {
   //                input_id: result[0],
   //                input_amount: result[1],
   //             });
   //          } else {
   //             // 등록된 회원이 아닐 시 다시 회원 확인
   //             res.redirect('/checkMember');
   //          }
   //       });
   // });

   // // localhost:4000/selectMember [get] 내 마일리지 정보와 마일리지를 송금할 회원 정보와 송금할 마일리지 정보 불러오기
   // router.get('/selectMember', function (req, res) {
   //    // 로그인 한 사용자 정보(지갑 주소) → 프론트에서 가져오는거 이렇게 하는거 맞는지 확인해야 함
   //    const user = req.query.MEMBER_WALLET;
   //    console.log('## 로그인한 사용자의 지갑 주소: ' + user);

   //    // checkMember 페이지에서 입력받은 데이터를 이렇게 불러오는 거 맞나... 모르겠음
   //    const input_id = req.query.input_id;
   //    const input_amount = req.query.input_amount;
   //    console.log('## 거래 주소, 거래 마일리지 양: ' + input_id, input_amount);

   //    // 그냥... 데이터 보내주면 되는건가...? 화면에 보여지기만 하면 되니까?
   //    res.json({
   //       user: user,
   //       input_id: input_id,
   //       input_amount: input_amount,
   //    });
   // });

   // localhost:4000/selectMember [post] 멤버 확인
   router.post('/selectMember', function (req, res) {
      // 마일리지 받는 사람, 수량 체크
      const input_id = req.body._id;
      const input_wallet = req.body._wallet;
      // const input_amount = req.body._amount;
      console.log('## 마일리지 받는 사람 번호, 지갑 주소: ' + input_id, input_wallet);

      // 쿼리문으로 멤버 확인
      const sql = `
      select 
      * 
      from
      member 
      where 
      MEMBER_ID = ? 
      or 
      MEMBER_WALLET = ?
      `;
      const values = [input_id, input_wallet];
      console.log('values', values);

      connection.query(sql, values, function (err, result) {
         if (err) {
            console.log(err);
            res.send(err);
         } else {
            console.log('>>>>>>', result);
            res.send({
               name: result[0].MEMBER_NAME,
               wallet: result[0].MEMBER_WALLET,
               // amount: input_amount,
            });
            // res.json(JSON.stringify(result));
            console.log('## result' + result);
            console.log('## selectMember result:' + JSON.stringify(result));
         }
      });
   });

   // localhost:4000/transfer [post] 마일리지 거래
   router.post('/transfer', function (req, res) {
      // 마일리지 보내는 사람 지갑 주소, 보내는 사람 id(핸드폰), 받는 사람 지갑 주소, 보낼 마일리지 양 불러오기?
      const sender = req.body.user_wallet;
      const sender_num = req.body.user_num;
      const receiver = req.body.input_wallet;
      const amount = req.body.input_amount;
      console.log('## 보내는 사람, 받는 사람, 보내는 마일리지: ' + sender, receiver, amount);

      // 마일리지 거래한 후 결과값을 보내주기...?
      smartcontract.methods
         .trans_mileage(sender, receiver, amount)
         .send({
            from: account.address,
            gas: 200000,
         })
         .then(function (result) {
            console.log('## transfer result: ' + JSON.stringify(result));

            // DB insert 구문 (token 테이블)
            sql = `
            insert into token
            (member_num, token_changed, trade_address) 
            values
            (?, ?, ?)
            `;
            values = [sender_num, amount, receiver];
            console.log('sender_num, amount, receiver: ' + sender_num, amount, receiver);
            connection.query(sql, values, function (err, token_result) {
               if (err) {
                  console.log(err);
                  res.send(err);
               } else {
                  console.log('token_result: ' + token_result);
               }
            });

            smartcontract.methods
               .view_mileage(sender)
               .call({
                  from: account.address,
               })
               .then(function (mile_result) {
                  console.log('## user mile_result' + mile_result);
                  // DB에 토탈 업데이트
                  sql2 = `
               update member 
               set token_total = ?
               where member_wallet = ?
               `;
                  values2 = [mile_result, sender];
                  console.log('## 마일리지 토탈, user: ' + mile_result, sender);
                  connection.query(sql2, values2, function (err, toten_total) {
                     if (err) {
                        console.log(err);
                        res.send(err);
                     } else {
                        console.log('## user token_total: ' + toten_total);
                     }
                  });
               });

            smartcontract.methods
               .view_mileage(receiver)
               .call({
                  from: account.address,
               })
               .then(function (mile_result) {
                  console.log('## receiver mile_result' + mile_result);
                  // DB에 토탈 업데이트
                  sql2 = `
               update member 
               set token_total = ?
               where member_wallet = ?
               `;
                  values2 = [mile_result, receiver];
                  console.log('## 마일리지 토탈, receiver: ' + mile_result, receiver);
                  connection.query(sql2, values2, function (err, toten_total) {
                     if (err) {
                        console.log(err);
                        res.send(err);
                     } else {
                        console.log('## receiver token_total: ' + toten_total);
                     }
                  });
               });
            //응답
            res.send(result);
         });
   });

   // 테스트용
   router.post('/user_list', function (req, res) {
      smartcontract.methods
         .view_users()
         .call({
            from: account.address,
         })
         .then(function (result) {
            res.send(result);
         });
   });

   // 테스트용 주소
   router.get('/user_mil', function (req, res) {
      smartcontract.methods
         .view_mileage('0x05d46463676Ec5F0e9676f39D651379c0F983bA4')
         .call({
            from: account.address,
         })
         .then(function (result) {
            res.send(result);
         });
   });

   // 회원가입할 때 처리함 (지갑 주소에 마일리지 넣어주는 거)
   router.post('/add_mile', function (req, res) {
      const receiver = req.body._receiver;
      const amount = req.body._amount;
      console.log(receiver, amount);

      smartcontract.methods
         .add_mileage(receiver, amount)
         .send({
            from: account.address,
            gas: 2000000,
         })
         .then(function (receipt) {
            res.send(receipt);
         });
   });

   return router;
};
