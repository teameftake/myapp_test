exports.OneTime = function(OTName,OTMail,OTSub,OTText){
    
    let OTPass = create_privateid(6);
    const OneTimeMail = '{"from":"'+OTName+'","to":"'+OTMail+'","subject":"'+OTSub+'","text":"'+OTText+'","one":"'+OTPass+'"}';
    mail = require('./Mail_Send');
    mail.Mail_Send(OneTimeMail);

    return OTPass;
}

function create_privateid( n ){
    var CODE_TABLE = "0123456789"
        + "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        + "abcdefghijklmnopqrstuvwxyz";
    var r = "";
    for (var i = 0, k = CODE_TABLE.length; i < n; i++){
        r += CODE_TABLE.charAt(Math.floor(k * Math.random()));
	}
	return r;
}