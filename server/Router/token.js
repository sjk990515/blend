//express 로드
const express = require("express");

// Router() 변수에 대입
const router = express.Router();

const token = require("../Token/kip7.js");

const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
});

// moment 모듈 로드
const moment = require("moment");
let date = moment();



// baobab network에 배포된 컨트렉트를 연동하기 위한 모듈을 로드
const Caver = require('caver-js');

//컨트렉트의 정보 로드
const contract_info = require('../build/contracts/board.json')

// baobab 네트워크 주소를 입력
const caver = new Caver("https://api.baobab.klaytn.net:8651")

// 배포된 컨트렉트를 연동
const smartcontract = new caver.klay.Contract(
    contract_info.abi,
    contract_info.networks['1001'].address
);

// 수수료를 지불할 지갑을 등록
const account = caver.klay.accounts.createWithAccountKey(
    process.env.public_key,
    process.env.private_key,
)

caver.klay.accounts.wallet.add(account);