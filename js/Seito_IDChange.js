exports.Seito_IDChange = function(SICjPass,SICjNewID1,SICjNewID2){
    let SICjError;
    let SICjCheck = Boolean(false);

    if(SICjPass=='a'){
        if(SICjNewID1==SICjNewID2){
            SICjCheck = true;
            const OT = require('./OneTime');
            let SICjOneTime = OT.OneTime('寮荷物受け渡しシステム','nkhshc391003@g.neec.ac.jp','ワンタイムパスワード','この値を画面に入力してください。');
            exports.SICjOneTime = SICjOneTime;
            let SICjRoomID = 'A213';
            exports.SICjRoomID = SICjRoomID;
            let SICjMail = 'nkhshc391003@g.neec.ac.jp';
             exports.SICjMail = SICjMail;
        }else{
            SICjError = {miss:'上と下の新しいIDが一致しません。'};
        }
    }else{
        SICjError = {miss:'パスワードが違います。'};
    }
    exports.error = SICjError;
    exports.SICjCheck = SICjCheck;
    
}