// import express body-parser request
// pm install express
// npm install body=parser
const express=require("express");
const bodyParser = require('body-parser');
const request=require("request");
const app=express();

app.use(bodyParser.urlencoded({extended:true}))
//get ส่งข้อมูลผ่าน url
//ฝั่งรับข้อมูลแบบ get
app.get("/",function (req,res) {
    res.sendFile(__dirname+"/index.html");
  });

//post ส่งข้อมูลไม่จำกัดขนาดและมองไม่เห็นข้อมูลที่ส่งไป 
//ฝั่งรับข้อมูลแบบ post
//req ขอข้อมูล
app.post("/",function(req,res) {
  console.log(req.body.crypto);
  console.log(req.body.fiat);
  //ดึงค่ามาจาก ฟอมชื่อ crypto,fiat
  var crypto=req.body.crypto;
  var fiat=req.body.fiat;
  var amount=req.body.amount;

  //external data api  
  //GET https://apiv2.bitcoinaverage.com/convert/{symbol_set}?from={source_cur}&to={target_cur}&amount={amount}
  var option={
    url:"https://apiv2.bitcoinaverage.com/convert/global",
    method:"GET",
    qs:{
      from:crypto,
      to:fiat,
      amount:amount
    }
  }
  
  request(option,function (error, response, body) {

    //แปลง body ที่เป็น txt ให้เป็น JSON object
    var data=JSON.parse(body);
    var price=data.price;
    var currentDat=data.time
    //แสดงค่าใน cmd นะจ๊ะ
    console.log(price);
    console.log(data);
    console.log(currentDat);

   res.write("<p>The current is "+currentDat+"</p>");
   res.write("<h1> The current price of "+crypto +" is "+price +" "+fiat+"</h1>")
   res.send();
  });
});  

app.listen(3000,function () { 
    console.log("server running port 3000");
 });