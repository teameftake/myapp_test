exports.Seito_PassChange = function(SPCjOldPass,SPCjNewPass1,SPCjNewPass2){
    let SPCjError;
    let SPCjCheck = Boolean(false);

    if(SPCjOldPass=='a'){
        if(SPCjNewPass1==SPCjNewPass2){
            if(SPCjOldPass!=SPCjNewPass1){
                SPCjCheck = true;
                const OT = require('./OneTime');
                let SPCjOneTime = OT.OneTime('寮荷物受け渡しシステム','nkhshc391003@g.neec.ac.jp','ワンタイムパスワード','この値を画面に入力してください。');
                exports.SPCjOneTime = SPCjOneTime;
                let SPCjRoomID = 'A213';
                exports.SPCjRoomID = SPCjRoomID;
                let SPCjMail = 'nkhshc391003@g.neec.ac.jp';
                exports.SPCjMail = SPCjMail;
            }else{
                SPCjError = {miss:'新しいパスワードと古いパスワードが同じです。'};
            }
        }else{
            SPCjError = {miss:'上と下の新しいパスワードが一致しません。'};
        }
    }else{
        SPCjError = {miss:'パスワードが違います。'};
    }
    exports.error = SPCjError;
    exports.SPCjCheck = SPCjCheck;
    
}