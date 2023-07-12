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
    // localhost:4000/token/list [get] 등록된 토큰의 랭킹
    router.get("/list", async function (req, res) {
        const sql = `
            select
            MEMBER_WALLET,
            TOKEN_TOTAL,
            MEMBER_NUM
            from
            MEMBER
            WHERE
            MEMBER_NUM
            NOT IN
            (1)
            ORDER BY
            TOKEN_TOTAL
            DESC
            LIMIT 5
        `;

        const companyWalletSQL = `
            select
            TOKEN_TOTAL
            from
            member
            where
            member_num = 1
        `;

        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                if (result.length != 0) {
                    // console.log("## Token_list " + result);

                    var sum = 0;
                    for (var i = 0; i < result.length; i++) {
                        var sum = sum + result[i].TOKEN_TOTAL;
                    }

                    connection.query(
                        companyWalletSQL,
                        function (err2, cwresult) {
                            if (err2) {
                                console.log(err2);
                                res.send(err2);
                            } else {
                                res.send({
                                    result: true,
                                    list: result,
                                    resultSum: sum,
                                    companyWallet: cwresult[0].TOKEN_TOTAL,
                                });
                            }
                        }
                    );
                } else {
                    res.send({ result: false });
                }
            }
        });
    });

    // http://localhost:4000/token/select [get]
    router.get("/select", async function (req, res) {
        const input_num = req.query._num;
        const input_total = req.query._total;

        const sql = `
        select 
            TOKEN_CHANGED,
            TOKEN_CONTENT,
            date_format(TOKEN_REGDATE, '%Y-%m-%d %T') as TOKEN_REGDATE,
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

        // const sql = `
        //     select 
        //         TOKEN_CHANGED,
        //         TOKEN_CONTENT,
        //         TOKEN_REGDATE,
        //         TRADE_ADDRESS
        //     from
        //         token
        //     where
        //         member_num = 
        //         (select 
        //             MEMBER_NUM
        //             from
        //             member
        //             where
        //             MEMBER_WALLET = ?
        //         )
        //     order by
        //         TOKEN_REGDATE
        //     desc
        //     limit
        //     10;
        // `;

        const values = [input_num];

        connection.query(sql, values, function (err, result) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                if (result.length != 0) {
                    // console.log("## Token_content" + result);
                    res.send({
                        result: true,
                        content: result,
                        total: input_total,
                    });
                } else {
                    res.send({ result: false });
                }
            }
        });
    });

    router.post("/myToken", function (req, res) {
        const input_num = req.body._num;

        console.log(input_num);

        const sql = `
      select 
      TOKEN_CHANGED,
      TOKEN_CONTENT,
      TOKEN_REGDATE,
      TRADE_ADDRESS
      from
      token
      where
      MEMBER_NUM = ?
      order by
      TOKEN_REGDATE
      desc
      limit
      10;
      `;

        const totalsql = `
      select
      TOKEN_TOTAL
      from
      member
      where
      MEMBER_NUM = ?
      `;

        const values = [input_num];

        connection.query(sql, values, function (err, result) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                if (result.length != 0) {
                    connection.query(
                        totalsql,
                        values,
                        function (err2, result2) {
                            if (err2) {
                                console.log(err);
                                res.send(err);
                            } else {
                                // console.log("## Token_Mycontent" + result);
                                res.send({
                                    result: true,
                                    content: result,
                                    total: result2[0].TOKEN_TOTAL,
                                });
                            }
                        }
                    );
                } else {
                    res.send({ result: false });
                }
            }
        });
    });
    return router;
};
