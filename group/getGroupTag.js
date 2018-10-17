function getGroupTag(db,cb){
    db.query(`SELECT * FROM group_tag ORDER BY group_tag_id ASC`,(err,data)=>{
        if(err){
            console.log(err);
            cb({
                error: true,
                msg: '数据库出错',
            })
        }else{
            cb({
                error: false,
                msg: '查找成功',
                data: data
            })
        }
    })
}
module.exports= getGroupTag;