const nodemailer = require('nodemailer');
function sendEmail(email,cb){
    // 开启一个 SMTP 连接池
    let transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',
        secureConnection: true, // use SSL
        port: 465,
        // secure: true, // secure:true for port 465, secure:false for port 587
        auth: {
            user: '814828525@qq.com',
            pass: 'iibkrzowhzmnbbcd' // QQ邮箱需要使用授权码
        }
    });

    var code = '';
    for(let i = 0; i < 4; i ++) {
        code = code + parseInt(Math.random()*10);
    }
    // 设置邮件内容
    let mailOptions = {
        from: '814828525@qq.com', // 发件人
        to: email, // 收件人
        subject: '验证码', // 主题
        text: '验证码', // plain text body
        html: `<b><p>Echo，您好！</p><p>您的验证码为 ：${code}</p> <p>请及时输入,该验证码将在3分钟后失效。</p><p>如有问题请联系管理员：814828525@qq.com</p></b>`, // html body
    };
    console.log(mailOptions);
    // 使用先前创建的传输器的 sendMail 方法传递消息对象
    transporter.sendMail(mailOptions, (error,info) => {
        if (error) {
            console.log('失败');
            console.log(error);
            cb({
                error: true,
                data: '获取激活码失败,请稍后重新获取',
            })
        }else{
            console.log('发送成功');
            cb({
                error: false,
                data: '激活码已发送至您的邮箱，请注意查收',
                codeInfo: {
                    code: code,
                    email: email,
                    date: Date.now()
                }
            })
        }
    });
}

module.exports= sendEmail;
