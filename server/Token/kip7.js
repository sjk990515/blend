// caver-js-ext-kas 로드
const CaverJsExtKas = require("caver-js-ext-kas");
// caverExtkas 클래스
const caver = new CaverJsExtKas();
// fs 모듈 로드
const fs= require('fs');

require('dotenv').config();

// KAS에 접속하기 위한 ID, PASSWORD의 파일을 로드
const kas_info = require('./kas.json')
console.log("## kas_info : "+kas_info)
// accesskeyId 변수, secretAccessKey 생성
const accesskeyId = kas_info.accessKeyId;
const secretAccessKey = kas_info.secretAccessKey
// testnet의 chainid 지정
const chainid = 1001;
console.log(accesskeyId,secretAccessKey);

//생성자 함수 호출
caver.initKASAPI(chainid,accesskeyId,secretAccessKey);

// KAS에서 외부의 지갑을 사용하기 위해선 지갑 등록
const keyringContainer = new caver.keyringContainer();
const keyring = keyringContainer.keyring.createFromPrivateKey(
    process.env.private_key
);
keyringContainer.add(keyring);

async function create_token(_name, _symbol,_decimal,_amount){
    const kip7 = await caver.kct.kip7.deploy(
        {
            name : _name,
            symbol : _symbol,
            decimals : _decimal,
            initialSupply : _amount
        },
        keyring.address,
        keyringContainer
    )
    const addr = kip7._address;

    console.log("address : " + addr);
    
    const kip7_address = {
        address : addr
    }

    const data = JSON.stringify(kip7_address)
    fs.writeFileSync('./Token/kip7.json',data)
    return "토큰 발행 완료"
}

// 거래용 함수
async function transfer(_address,_amount){
    //발생한 토큰을 wallet에 추가
    const token_info = require('./kip7.json');
    const kip7 = await new caver.kct.kip7(token_info.address);
    kip7.setWallet(keyringContainer)
    
    const receipt = await kip7.transfer(
        _address,
        _amount,
        {
            from : keyring.address
        }
    )

    console.log("## transfer : "+receipt);
    return "토큰 거래 완료"
}

// 지갑 확인 함수

async function balance_of(_address){
    const token_info = require('./kip7.json')
    const kip7 = await new caver.kct.kip7(token_info.address);
    kip7.setWallet(keyringContainer);

    const balance = await kip7.balanceof(_address)
    console.log("##balance of : "+balance);
    return balance
}

// 지갑을 생성
async function create_wallet(){
    const wallet = await caver.kas.wallet.createAccount();
    console.log("##create wallet : "+wallet);
    return wallet.address
}





module.exports = {
    create_token,transfer,balance_of,create_wallet
}