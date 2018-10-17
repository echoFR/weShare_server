const crypto=require('crypto');

module.exports={
  MD5_SUFFIX: 'FDSW$t34treg',
  md5: function (str){
    var obj=crypto.createHash('md5');
    obj.update(str);
    return obj.digest('hex');
  }
};
