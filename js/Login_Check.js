exports.Login_Check=function(LCid,LCpass){
        let check = new Boolean(false);
        if(LCid=='a' && LCpass=='b'){
                check = true;
        }else{
                //let miss = {miss:'部屋番号かパスワードが違います！もう一度'};
                //response.render('Seito_Login.ejs',miss);
        }
        exports.check=check;
}
