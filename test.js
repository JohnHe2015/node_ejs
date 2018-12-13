const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.listen(8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/jinshuju', (req, res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    console.log('after set head');
    let data ="";
   // if(req.method=="OPTIONS")
        console.log(req.body);
        let stringJson = JSON.stringify(req.body);
        console.log('jsonString : '+stringJson);
        data += "渠   道：微信\r\n";
        data += `联系方式：${req.body.entry.field_3}\r\n`;
        data += `咨询门店：缪诗店\r\n`;
        data += `拍摄选项：${req.body.entry.field_1[0]}`;
        //console.log(json.entry.serial_number);
        console.log('recieved data : '+data);
        //res.send(200);

        var transporter = nodemailer.createTransport({
            host: 'smtp.163.com', 
            secureConnection: true,     //用SSL 端口: 465
            auth: {
                user: 'xiaozhemu@163.com',
                pass: 'Klsakura5845'
            },
            port:465
        });
          var mailOptions = {
              from: '何哲<xiaozhemu@163.com>', // sender address 
              to: 'susie.zheng@musee.cc', // list of receivers 
              subject: `金数据`, // Subject line 
              text: data, // plaintext body 
              //html: '<b>Hello world </b>' // html body 
          };
        transporter.sendMail(mailOptions, function(error, info){
              if(error){
                  console.log(error);
              }else{
                  console.log('Message sent: ' + info.response);
                  res.sendStatus(200);
              }
          });

        res.sendStatus(200);
   // } /*让options请求快速返回*/

});