// express 로드
const express = require('express');
// Router() 변수에 대입
const router = express.Router();

// baobab network에 배포한 컨트랙트를 연동하기 위한 모듈 로드
const Caver = require('caver-js');
// 컨트랙트의 정보 로드
const contract_info = require('../build/contracts/Mileage.json');
// baobab 네트워크 주소 입력
const caver = new Caver('https://api.baobab.klaytn.net:8651');

// 배포된 컨트랙트 연동
const smartcontract = new caver.klay.Contract(contract_info.abi, contract_info.networks['1001'].address);

// 수수료 지불할 지갑을 등록
const account = caver.klay.accounts.createWithAccountKey(process.env.public_key, process.env.private_key);
// 지갑에 계정 추가
caver.klay.accounts.wallet.add(account);

module.exports = function () {
   // api 생성
   // 해당 파일의 api의 기본 경로: localhost:4000/trade

   // localhost:4000/checkMember []

   return router;
};
