const express = require('express');
const router = express.Router();


router.post('/get_data',(req,res,next)=>{
    console.log(req.body);
});

module.exports = router;