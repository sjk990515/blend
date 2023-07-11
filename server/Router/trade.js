// express 로드
const express = require('express');
// Router() 변수에 대입
const router = express.Router();

// 컨트랙트의 정보 로드
const contract_info = require('../build/contracts/Mileage.json');
// const contract_abi = contract_info.abi;
// const contract_address = contract_info.networks['1001'].address;
// console.log('##컨트랙트 주소: ' + contract_address);
// 컨트랙트가 배포된 네트워크 등록
// const { Web3 } = require('web3');
// const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

// const smartcontract = new web3.eth.Contract(contract_abi, contract_address);

// caver-js 로드
const Caver = require('caver-js');
// 바오밥 네트워크 주소 입력
const caver = new Caver('http://api.baobab.klaytn.net:8651');

const smartcontract = new caver.klay.Contract(contract_info.abi, contract_info.networks['1001'].address);

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

   // localhost:4000/checkMember [get] 컨트랙트에 등록된 유저인지 확인
   router.get('/checkMember', function (req, res) {
      const input_id = req.query.id;
      const input_amount = req.query._amount;
      console.log('## 회원번호 확인: ' + input_id);

      smartcontract.methods
         .view_users(input_id)
         .call()
         .then(function (result) {
            // 컨트랙트에 등록된 회원이 확인되면 마일리지 송금 페이지로 보내준다
            if (result[0] == input_id) {
               res.render('/selectMember', {
                  input_id: result[0],
                  input_amount: result[1],
               });
            } else {
               // 등록된 회원이 아닐 시 다시 회원 확인
               res.redirect('/checkMember');
            }
         });
   });

   // localhost:4000/selectMember [get] 내 마일리지 정보와 마일리지를 송금할 회원 정보와 송금할 마일리지 정보 불러오기
   router.get('/selectMember', function (req, res) {
      // 로그인 한 사용자 정보(지갑 주소) → 프론트에서 가져오는거 이렇게 하는거 맞는지 확인해야 함
      const user = req.query.MEMBER_WALLET;
      console.log('## 로그인한 사용자의 지갑 주소: ' + user);

      // checkMember 페이지에서 입력받은 데이터를 이렇게 불러오는 거 맞나... 모르겠음
      const input_id = req.query.input_id;
      const input_amount = req.query.input_amount;
      console.log('## 거래 주소, 거래 마일리지 양: ' + input_id, input_amount);

      // 그냥... 데이터 보내주면 되는건가...? 화면에 보여지기만 하면 되니까?
      res.json({
         user: user,
         input_id: input_id,
         input_amount: input_amount,
      });
   });

   // localhost:4000/transfer [get] 마일리지 거래
   router.get('/transfer', function (req, res) {
      // 마일리지 보내는 사람, 받는 사람, 보낼 마일리지 양 불러오기?
      const sender = req.query.user;
      const receiver = req.query.input_id;
      const amount = req.query.input_amount;
      console.log('## 보내는 사람, 받는 사람, 보내는 마일리지: ' + sender, receiver, amount);

      // 마일리지 거래한 후 결과값을 보내주기...?
      smartcontract.methods
         .trans_mileage(sender, receiver, amount)
         .call()
         .then(function (result) {
            res.json(result);
         });
   });

   return router;
};
