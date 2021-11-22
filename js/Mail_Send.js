exports.Mail_Send = function(MailData){
    const NodeMailer = require('nodemailer');
    console.log(MailData);
    const obj = JSON.parse(MailData);
    function sendMail (smtpData,mailData){

        const transporter = NodeMailer.createTransport(smtpData);

        transporter.sendMail(mailData,function(error,info){
            if(error){
                console.log(error);
            }else{
                console.log('Email sent:'+info.response);
        }
    })
    }

    function main(){
        const smtpData={
            host:'smtp.gmail.com',
            port:'465',
            secure:true,
            auth:{
                user:'kannoyuuki64@gmail.com',
                pass:'ynltugkdvkayemsn'
            }
        }

        const mailData={
            from:obj.from+'<'+smtpData.auth.user+'>',
            to:obj.to,
            subject:obj.subject,
            text:obj.text+obj.one
        }
        sendMail(smtpData,mailData);
    
    }
    main()
    console.log('yaltutaze');
}
