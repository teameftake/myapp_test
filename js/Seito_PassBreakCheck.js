exports.Seito_PassBreakChack = function(SPBCjPass){
    let SPBCjError;
    let SPBCjCheck = Boolean(false);

    if(SPBCjPass=='a'){
        SPBCjCheck = true;

        SPBCjMail = 'nkhshc391003@g.neec.ac.jp';
        exports.SPBCjMail = SPBCjMail;
        SPBCjRoomID = 'A213';
        exports.SPBCjRoomID = SPBCjRoomID
        
        const OT = require('./OneTime');
        OTC = OT.OneTime('寮荷物管理システム',SPBCjMail,'ワンタイムパスワード','この値を入力してください。');
        exports.OTC = OTC;
    }else{
        SPBCjError = {miss:'パスワードが違います。'};
        exports.error = SPBCjError;
    }
    exports.SPBCjCheck = SPBCjCheck;
    
}