const express = require('express');
const app = express();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();
const TronWeb = require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://trongrid.io");
const solidityNode = new HttpProvider("https://trongrid.io");
const eventServer = new HttpProvider("https://trongrid.io");
const privateKey =  "3ca7028ca2b4654239a945c08bb5f5aa0d59fd1bf594a0263fde019baa78a65c";
const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);



var totSup = 0;
var cirSup = 0;
var tresureSup = 0;

var totSupDec = 0;
var cirSupDec = 0;
var tresureSupDec = 0;


app.listen(3000, () => StartServer());

  // Define a GET request handler for the user resource
  app.get('/TotalSupply', (req, res) => {
    GetData(),
    res.send(totSupDec.toString());
  });

  app.get('/', (req, res) => {
    res.send("api Main page");
    StartServer();
  });
  
  app.get('/CirculatinSupply', (req, res) => {
    GetCirSup();
    cirSup = totSup - tresureSup;
    cirSupDec = cirSup.toString();
    var cirSupDec = cirSupDec.slice(0, 8) + "." + cirSupDec.slice(8);
    res.send(cirSupDec.toString());
    tresureSup = 0;
  });


  
const options = {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({value: 1002357})
  };
  


  const options2 = {
    method: 'POST',
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    body: JSON.stringify({address: "TXVEEBBi5Gb1j6u1yHxegWA6gHT3vKpyrW", visible: true})
  };
  const options3 = {
    method: 'POST',
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    body: JSON.stringify({address: "TTzC9cm1vbsyBzhC8n4z3k6eAVkryDyKU8", visible: true})
  };
  const options4 = {
    method: 'POST',
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    body: JSON.stringify({address: 	"TPXWcCPQTdH7JgaaEoqSAPrETEjBNYHZLj", visible: true})
  };
  const options5 = {
    method: 'POST',
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    body: JSON.stringify({address: "TS1oUqaUBf5h5w9FsnAkWzbNhfbJ5ZPbcp", visible: true})
  };
  const options6 = {
    method: 'POST',
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    body: JSON.stringify({address: 	"TYt4RiyDWdmqJXk6bv7sEYbFxAA6P53LJ9", visible: true})
  };
  const options7 = {
    method: 'POST',
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    body: JSON.stringify({address: 	"TKNpPoqR3qUwGL2vxVKwscbUvbFTaubg8o", visible: true})
  };

function StartServer(){
    console.log('server started');
    GetData();
    GetCirSup();
}

async function GetCirSup(){

  fetch('https://api.trongrid.io/wallet/getaccount', options2)
  .then(response => response.json())
  .then(response =>CalCulateCirSup(response.assetV2))
  .catch(err => console.error(err));

  fetch('https://api.trongrid.io/wallet/getaccount', options3)
  .then(response => response.json())
  .then(response =>CalCulateCirSup(response.assetV2))
  .catch(err => console.error(err));

  fetch('https://api.trongrid.io/wallet/getaccount', options4)
  .then(response => response.json())
  .then(response =>CalCulateCirSup(response.assetV2))
  .catch(err => console.error(err));

  fetch('https://api.trongrid.io/wallet/getaccount', options5)
  .then(response => response.json())
  .then(response =>CalCulateCirSup(response.assetV2))
  .catch(err => console.error(err));

  fetch('https://api.trongrid.io/wallet/getaccount', options6)
  .then(response => response.json())
  .then(response =>CalCulateCirSup(response.assetV2))
  .catch(err => console.error(err));
  
  fetch('https://api.trongrid.io/wallet/getaccount', options7)
  .then(response => response.json())
  .then(response =>CalCulateCirSup(response.assetV2))
  .catch(err => console.error(err));


  cirSup = totSup-tresureSup;
  console.log(tresureSup);
}

function GetData(){
    fetch('https://api.trongrid.io/wallet/getassetissuebyid', options)
    .then(response => response.json())
    .then(response => SetTotalSupply(response.total_supply))
    .catch(err => console.error(err));
}

function SetTotalSupply(newSup){
    totSup = newSup
    newSup = newSup.toString();
    var newSup = newSup.slice(0, 8) + "." + newSup.slice(8);
    totSupDec = newSup;
}

function CalCulateCirSup(val){
  let key = 1002357;
  for (let index = 0; index < val.length; index++) {
    if (val[index].key == key) {
      tresureSup += val[index].value;
      return;
    }
  }
}