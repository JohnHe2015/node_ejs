const express = require('express');
const router = express.Router();

router.get('/chatroom',(req,res,next)=>{
    
    res.render('chatroom');
    
});

module.exports = router;