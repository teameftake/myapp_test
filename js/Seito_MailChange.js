exports.Seito_MailChange = function(SMCjMail1,SMCjMail2,SMCjPass){
    let SMCjError;
    let SMCjCheck = Boolean(false);

    if(SMCjPass=='a'){
        if(SMCjMail1==SMCjMail2){
            SMCjCheck = true;
            const OT = require('./OneTime');
            let SMCjOneTime = OT.OneTime('寮荷物受け渡しシステム','nkhshc391003@g.neec.ac.jp','ワンタイムパスワード','この値を画面に入力してください。');
            exports.SMCjOneTime = SMCjOneTime;
            let SMCjRoomID = 'A213';
            exports.SMCjRoomID = SMCjRoomID;
        }else{
            SMCjError = {miss:'上と下のメールアドレスが一致しません。'};
        }
    }else{
        SMCjError = {miss:'パスワードが違います。'};
    }
    exports.error = SMCjError;
    exports.SMCjCheck = SMCjCheck;
    
}