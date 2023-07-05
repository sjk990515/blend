// caver-js-ext-kas 로드
const CaverJsExtKas = require("caver-js-ext-kas");
// caverExtkas 클래스
const caver = new CaverJsExtKas();
// fs 모듈 로드
const fs= requre('fs');

require('dotenv').config();

// KAS에 접속하기 위한 ID, PASSWORD의 파일을 로드
const kas_info = require('./kas.json')
console.log("## kas_info : "+kas_info)
// accesskeyId 변수, secretAccessKey 생성
const accesskeyId = kas_info.accessKeyId;
const secretAccessKey = kas_info.secretAccessKeyl