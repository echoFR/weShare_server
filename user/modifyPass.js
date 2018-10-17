const common= require('../libs/common');
const matchPass= require('../user/matchPass');
function modifyPass(db,email,old_pass,new_pass,cb){
    // 密码解密
    let md5_pass= common.md5(old_pass+common.MD5_SUFFIX)
    // 密码是否正确
    matchPass(db,email,md5_pass,(data)=>{
            if(data.error){
                cb(data)
            }
            else{
                let new_md5_pass= common.md5(new_pass+common.MD5_SUFFIX)
                //旧密码正确 修改密码
                db.query(`update user_info set password='${new_md5_pass}' where email='${email}';`,(err,data)=>{
                    if(err){
                        console.log(err);
                        cb({
                            error: true,
                            data: '数据库出错，修改失败'
                        })
                    }else{
                        cb({
                            error: false,
                            data: '修改成功'
                        })
                    }
                })
            }
        })
}

module.exports= modifyPass;