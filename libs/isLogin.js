function isLogin(req){
    if(req.session && req.session.user_info){
        return true;
    }else{
        return false;
    }
}
module.exports= isLogin;