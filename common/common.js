const uuid = require('uuid/v4');
const crypto = require('crypto');
module.exports = {
    uuid : function()
    {
        return uuid().replace(/\-/g,"");
    },
    md5 : function(str)
    {
        return crypto.createHash("md5").update(str).digest('hex');
    }
};