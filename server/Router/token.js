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
const Caver = require("caver-js");

//컨트렉트의 정보 로드
const contract_info = require("../build/contracts/Mileage.json");

// baobab 네트워크 주소를 입력
const caver = new Caver("https://api.baobab.klaytn.net:8651");

// 배포된 컨트렉트를 연동
const smartcontract = new caver.klay.Contract(
    contract_info.abi,
    contract_info.networks["1001"].address
);

// 수수료를 지불할 지갑을 등록
const account = caver.klay.accounts.createWithAccountKey(
    process.env.public_key,
    process.env.private_key
);

caver.klay.accounts.wallet.add(account);

module.exports = function () {
    // localhost:4000/token/list [post] 등록된 토큰의 랭킹
    router.post("/list", async function (req, res) {
        const sql = `
      select
      MEMBER_WALLET,
      TOKEN_TOTAL
      from
      MEMBER
      ORDER BY
      TOKEN_TOTAL
      DESC
      LIMIT 10
      `;
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                if (result.length != 0) {
                    console.log("## Token_list" + result);
                    res.send({
                        result: true,
                        list: result,
                    }); // 메인으로 가는 경로 정해지면 바꿔주세요
                } else {
                    res.send({ result: false });
                }
            }
        });
    });

    router.post("/select", async function (req, res) {
        const input_wallet = req.body._wallet;

        const sql = `
      select 
      TOKEN_CHANGED,
      TOKEN_CONTENT,
      TOKEN_REGDATE,
      TRADE_ADDRESS
      from
      token
      where
      member_num = 
      (select 
         MEMBER_NUM
         from
         member
         where
         MEMBER_WALLET = ?
         )
      order by
      TOKEN_REGDATE
      desc
      limit
      10;
      `;
        const companyWalletSQL = `
      select
      TOKEN_TOTAL
      from
      member
      where
      member_num = 1
      `;

        const values = [input_wallet];

        connection.query(sql, values, function (err, result) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                if (result.length != 0) {
                    console.log("## Token_content" + result);
                    var sum = 0;
                    for (var i = 0; i < result.length; i++) {
                        var sum = sum + result[i].TOKEN_TOTAL;
                    }
                    console.log(sum);

                    connection.query(
                        companyWalletSQL,
                        function (err, cwresult) {
                            res.send({
                                result: true,
                                resultSum: sum,
                                companyWallet: cwresult[0],
                                content: result,
                            });
                        }
                    );
                } else {
                    res.send({ result: false });
                }
            }
        });
    });

    router.post("/myToken", async function (req, res) {
        const input_num = req.body._num;

        const sql = `
      select 
      TOKEN_CHANGED,
      TOKEN_CONTENT,
      TOKEN_REGDATE,
      TRADE_ADDRESS
      from
      token
      where
      member_num = ?
      order by
      TOKEN_REGDATE
      desc
      limit
      10;
      `;

        const values = [input_num];

        connection.query(sql, values, function (err, result) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                if (result.length != 0) {
                    console.log("## Token_Mycontent" + result);
                    res.send({
                        result: true,
                        content: result,
                    }); // 메인으로 가는 경로 정해지면 바꿔주세요
                } else {
                    res.send({ result: false });
                }
            }
        });
    });
    return router;
};
