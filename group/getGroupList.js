function getGroupList(db,id,cb){
    const errorMsg={
        error: true,
        msg: '数据库出错'
    }
    switch(id){
        case '1':   //热门 10条
            db.query(`SELECT * FROM group_info ORDER BY fans_num DESC LIMIT 10`,(err,data)=>{
                if(err){
                    console.log(err);
                    cb(errorMsg)
                }else{
                    cb({
                        error: false,
                        msg: '热门圈子列表',
                        data: data
                    })
                }
            })
            return
        case '12':    //全部
            db.query(`SELECT * FROM group_info`,(err,data)=>{
                if(err){
                    console.log(err)
                    cb(errorMsg)
                }else{
                    cb({
                        error: false,
                        msg: '全部圈子列表',
                        data: data
                    })
                }
            })
            return
        default:
            db.query(`SELECT * FROM group_info WHERE group_tag_id=${id}`,(err,data)=>{
                if(err){
                    console.log(err);
                    cb(errorMsg)
                }else{
                    cb({
                        error: false,
                        msg: '其他圈子列表',
                        data: data
                    })
                }
            })
            return
    }
}
module.exports= getGroupList;