// express 로드
const express = require('express');

// Router() 변수에 대입
const router = express.Router();

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
   // 기본 경로: localhost:4000/main

   router.get('/', function (req, res) {
      // goods 테이블에서 상품사진(GOODS_CONTENT) 데이터 불러오기
      const sql = `
        select
        GOODS_CONTENT
        from
        goods
    `;
      connection.query(sql, function (err, result) {
         if (err) {
            console.log(err);
            res.send(err);
         } else {
            if (req.sessionID) {
               console.log(req.session.logined);
               console.log(result[0], result[1], result[2]);
               res.json({
                  data: req.session.logined,
                  data1: result[0],
                  data2: result[1],
                  data3: result[2],
               });
            }
         }
      });
   });

   return router;
};
