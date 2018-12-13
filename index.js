const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const dbconfig = require('./config/mysql.config.js')
const common = require('./common/common.js')
const loginRouter = require('./router/login.js')
const chatroomRouter = require('./router/chatroom.js')
const mainRouter = require('./router/main.js')
const jinshuju = require('./router/jinshuju.js')


const app = express();
app.listen(8080);
//db
const db = mysql.createPool(dbconfig.mysql);
//set ejs template env
app.set('view engine','ejs');
app.set('views',__dirname + '/ejs');
//set static resource path
app.use(express.static('./public'));
//cookie parser
app.use(cookieParser());
//body parser
app.use(bodyParser.urlencoded({ extended: false }));
//validate all req , if user login
app.use((req,res,next)=>{
    //传送数据库对象
    if(!req.db)
    {
        req.db = db;
    }
    if((!req.cookies['token'] && req.url != '/login') || req.url == "/")
    {
        res.redirect('/login');
    }
    else if(req.url == '/login')
    {
        next();
    }
    else
    {
        db.query(`SELECT ID FROM user_table WHERE ID='${req.cookies['token']}'`,(err,data)=>{
            if(err)
            {
                res.status(500).send('db error');
            }
            else if(data.length == 0)
            {
                res.send('伪造cookie啊你');
            }
            else
            {
                next();
                //res.redirect(req.url);
            }
        }); 
    }
});
// add login router
app.use('/',loginRouter);
// add admin router
app.use('/admin',chatroomRouter);
//add main router
app.use('/admin',mainRouter);
//additional
app.use('/jinshuju',jinshuju);





