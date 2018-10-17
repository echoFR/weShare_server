// 查找圈子详细信息
function getGroupInfo(db,id,cb){
    db.query(`SELECT * FROM group_info WHERE group_id=${id}`,(err,data)=>{
        if(err){
            cb({
                error: true,
                msg: '数据库出错'
            })
        }else{
            cb({
                error: false,
                msg: '圈子信息',
                data: data
            })
        }
    })
}

module.exports= getGroupInfo;