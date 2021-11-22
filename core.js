//expressの機能を使うための宣言//
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(express.static('/'));
//~~~~~~~~~~~~~~~~~~~~~~~~//

//ejsの機能を使うための宣言//
app.set("view engine","ejs");
app.use("/static",express.static(__dirname+"html"));
//~~~~~~~~~~~~~~~~~~~~~~~~//

//express-sesionの機能を使うための宣言処理//
const session = require('express-session');
app.use(session({
  secret:'testsec',
  resave:false,
  saveUninitialized:false,
  cookie:{
    httpOnly:true,
    secure:false,
    maxage:1000*60*15
  }
}))
//~~~~~~~~~~~~~~~~~~~~~~~~//

//ログインページのGET・POST//
try{
app.get('/',(request,response) => {
  response.sendFile(__dirname+'/html/Seito_Login.html');
})
app.post('/',(request,response)=>{
  sub = require('./js/Login_Check');
  sub.Login_Check(request.body.SLid,request.body.SLpassword);
  if(sub.check==true){
    //セッションIDと生徒確認用IDの発行//
    SeitoID = request.body.SLid;
    request.session.userID = request.body.SLid;
    response.redirect('/Seito_Top');
  }else{
    let miss = {miss:'部屋番号かパスワードが違います！もう一度'};
    response.render('Seito_Login.ejs',miss);
  }
})
//~~~~~~~~~~~~~~~~~~~~~~~~//

//パスワード忘れた時用のパスワード再設定ページへのGET・POST//
app.get('/Seito_Wasureta',(request,response)=>{
  response.sendFile(__dirname+'/html/Seito_Wasureta.html');
})
app.post('/Seito_Wasureta',(request,response)=>{
  sub = require('./js/Seito_PassBreakCheck.js');
  sub.Seito_PassBreakChack(request.body.SWhID);
  if(sub.SPBCjCheck == true){
    SPBCOT = OTC;
    SPBC_Mail = SPBCjMail;
    SPBC_RoomID = SPBCjRoomID;
    WasuretaID = request.body.SWhID;
    request.session.userID = request.body.SWhID;
    response.sendFile(__dirname+'/html/Seito_PassBreakOT.html');
  }else{
    miss = {miss:'IDが違います。'};
    response.render('Seito_Wasureta.ejs',miss);
  }
})
app.post('/Seito_PassBreakOT',(request,response)=>{
  if(request.session.userID!=null && request.session.userID == WasuretaID){
    if(request.body.SPBOThPass == SPBCOT){
      response.sendFile(__dirname+'/html/Seito_PassBreakChange.html');
    }else{
      miss = {miss:'ワンタイムパスワードが違います。'};
      response.render('Seito_PassBreakOT.ejs',miss);
    }
  }else{
    response.redirect('/');
  }
  
})
app.get('/Seito_PassBreakOTR',(request,response)=>{
  if(request.session.userID!=null && request.session.userID == WasuretaID){
    sub = require('./js/OneTime');
    SPBCOT = sub.OneTime('寮荷物管理システム',SPBC_Mail,'ワンタイムパスワード','この値を入力してください。');
    response.sendFile(__dirname+'/html/Seito_PassBreakOT.html');
  }else{
    response.redirect('/');
  }
  
})
app.post('/Seito_PassBreakChange',(request,response)=>{
  if(request.session.userID!=null && request.session.userID == WasuretaID){
    sub = require('./js/Seito_PassBreakChange');
    sub.Seito_PassBreakChange(request.body.SPBChPass1,request.body.SPBChPass2,request.body.SPBC_RoomID);
    if(sub.SPBCjCheck == true){
      delete SPBCOT;
      delete SPBC_Mail;
      delete SPBC_RoomID;
      delete WasuretaID;
      request.session.destroy();
      response.sendFile(__dirname+'/html/Seito_PassBreakChangeOK.html');
    }else{
      miss = {miss:'上と下のパスワードが違います。'};
      response.render('Seito_PassBreakChange.ejs',miss);
    }
  }else{
    response.redirect('/');
  }
  
})
//~~~~~~~~~~~~~~~~~~~~~~~~//

//トップページのGET・POST//
app.get('/Seito_Top',(request,response)=>{
  if (request.session.userID!=null && request.session.userID==SeitoID) {
    response.sendFile(__dirname+'/html/Seito_Top.html');
  }else{
    response.redirect('/');
  }
})
app.get('/Setio_Logout',(request,response)=>{
  delete SeitoID;
  request.session.destroy();
  response.redirect('/');
})
//~~~~~~~~~~~~~~~~~~~~~~~~//

//生徒メールアドレスの変更ページへのGET・POST//
app.get('/Seito_MailChange',(request,response) =>{
  if(request.session.userID!=null && request.session.userID==SeitoID) {
    response.sendFile(__dirname+'/html/Seito_MailChange.html');
  }else{
  response.redirect('/');
}
})
app.post('/Seito_MailChange',(request,response) =>{
  if(request.session.userID!=null && request.session.userID==SeitoID) {
    sub = require('./js/Seito_MailChange');
    sub.Seito_MailChange(request.body.SMChMail1, request.body.SMChMail2, request.body.SMChPass);
    if(sub.SMCjCheck==true){
      Seito_NewMail = 'nkhshc391003@g.neec.ac.jp';//request.body.SMChMail1;
      SMCOT = sub.SMCjOneTime;
      SMC_RoomID = sub.SMCjRoomID;
      response.sendFile(__dirname+'/html/Seito_MailChangeOT.html');
    }else{
      miss = sub.error;
      response.render('Seito_MailChange.ejs',miss);
    }
  }else{
    response.redirect('/');
  }
})
app.post('/Seito_MailChangeOT',(request,response) =>{
  if(request.session.userID!=null && request.session.userID==SeitoID) {
    if(SMCOT = request.body.SMCOThPass){
      sub = require('./js/Seito_MailChangeOT');
      sub.Seito_MailChangeOT(Seito_NewMail,SMC_RoomID);
      if(sub.SMCOjCheck==true){
        delete Seito_NewMail;
        delete SMCOT;
        delete SMC_RoomID;
        response.sendFile(__dirname+'/html/Seito_MailChangeOK.html');
      }else{
        console.log('失敗！');
      }
    }else{
      miss = {miss:'ワンタイムパスワードが違います。'};
      response.render('Seito_MailChangeOT.ejs',miss);
    }
  }else{
    response.redirect('/');
  }
})
app.get('/Seito_MailChangeOTR',(request,response) =>{
  if(request.session.userID!=null && request.session.userID==SeitoID) {
    sub = require('./js/OneTime');
    let SMCOT = sub.OneTime('寮荷物受け渡しシステム',Seito_NewMail,'ワンタイムパスワード','この値を画面に入力してください。');
    miss = {miss:'ワンタイムパスワードを再発行しました。'};
    response.render('Seito_MailChangeOT.ejs',miss);
  }else{
    response.redirect('/');
  }

})
//~~~~~~~~~~~~~~~~~~~~~~~~//

//生徒パスワードの変更ページへのGET・POST//
app.get('/Seito_PassChange',(request,response) =>{
  if(request.session.userID!=null && request.session.userID==SeitoID) {
    response.sendFile(__dirname+'/html/Seito_PassChange.html');
  }else{
    response.redirect('/');
}
})
app.post('/Seito_PassChange',(request,response) =>{
  if(request.session.userID!=null && request.session.userID==SeitoID) {
    sub = require('./js/Seito_PassChange');
    sub.Seito_PassChange(request.body.SPChOldPass, request.body.SPChNewPass1, request.body.SPChNewPass2);
    if(sub.SPCjCheck==true){
      Seito_NewPass = '1234';//request.body.SPChNewPass1;
      SPCOT = sub.SPCjOneTime;
      SPC_RoomID = sub.SPCjRoomID;
      SPC_Mail = sub.SPCjMail;
      response.sendFile(__dirname+'/html/Seito_PassChangeOT.html');
    }else{
      miss = sub.error;
      response.render('Seito_PassChange.ejs',miss);
    }
  }else{
    response.redirect('/');
  }
})
app.post('/Seito_PassChangeOT',(request,response) =>{
  if(request.session.userID!=null && request.session.userID==SeitoID) {
    if(SPCOT = request.body.SPCOThPass){
      sub = require('./js/Seito_PassChangeOT');
      sub.Seito_PassChangeOT(Seito_NewPass,SPC_RoomID);
      if(sub.SPCOjCheck==true){
        delete Seito_NewPass;
        delete SPCOT;
        delete SPC_RoomID;
        delete SPC_Mail;
        delete SeitoID;
        request.session.destroy();
        response.sendFile(__dirname+'/html/Seito_PassChangeOK.html');
      }else{
        console.log('失敗！');
      }
    }else{
      miss = {miss:'ワンタイムパスワードが違います。'};
      response.render('Seito_PassChangeOT.ejs',miss);
    }
  }else{
    response.redirect('/');
  }
})
app.get('/Seito_PassChangeOTR',(request,response) =>{
  if(request.session.userID!=null && request.session.userID==SeitoID) {
    sub = require('./js/OneTime');
    let SPCOT = sub.OneTime('寮荷物受け渡しシステム',SPC_Mail,'ワンタイムパスワード','この値を画面に入力してください。');
    miss = {miss:'ワンタイムパスワードを再発行しました。'};
    response.render('Seito_PassChangeOT.ejs',miss);
  }else{
    response.redirect('/');
  }

})
//~~~~~~~~~~~~~~~~~~~~~~~~//

//生徒IDの変更ページへのGET・POST
app.get('/Seito_IDChange',(request,response) =>{
  if(request.session.userID!=null && request.session.userID==SeitoID) {
    response.sendFile(__dirname+'/html/Seito_IDChange.html');
  }else{
    response.redirect('/');
}
})
app.post('/Seito_IDChange',(request,response) =>{
  if(request.session.userID!=null && request.session.userID==SeitoID) {
    sub = require('./js/Seito_IDChange');
    sub.Seito_IDChange(request.body.SIChPass, request.body.SIChNewID1, request.body.SIChNewID2);
    if(sub.SICjCheck==true){
      Seito_NewID = '1234';//request.body.SIChNewID1;
      SICOT = sub.SICjOneTime;
      SIC_RoomID = sub.SICjRoomID;
      SIC_Mail = sub.SICjMail;
      response.sendFile(__dirname+'/html/Seito_IDChangeOT.html');
    }else{
      miss = sub.error;
      response.render('Seito_IDChange.ejs',miss);
    }
  }else{
    response.redirect('/');
  }
})
app.post('/Seito_IDChangeOT',(request,response) =>{
  if(request.session.userID!=null && request.session.userID==SeitoID) {
    if(SICOT = request.body.SICOThPass){
      sub = require('./js/Seito_IDChangeOT');
      sub.Seito_IDChangeOT(Seito_NewID,SIC_RoomID);
      if(sub.SICOjCheck==true){
        delete Seito_NewID;
        delete SICOT;
        delete SIC_RoomID;
        delete SIC_Mail;
        delete SeitoID;
        request.session.destroy();
        response.sendFile(__dirname+'/html/Seito_IDChangeOK.html');
      }else{
        console.log('失敗！');
      }
    }else{
      miss = {miss:'ワンタイムパスワードが違います。'};
      response.render('Seito_IDChangeOT.ejs',miss);
    }
  }else{
    response.redirect('/');
  }
})
app.get('/Seito_IDChangeOTR',(request,response) =>{
  if(request.session.userID!=null && request.session.userID==SeitoID) {
    sub = require('./js/OneTime');
    let SICOT = sub.OneTime('寮荷物受け渡しシステム',SIC_Mail,'ワンタイムパスワード','この値を画面に入力してください。');
    miss = {miss:'ワンタイムパスワードを再発行しました。'};
    response.render('Seito_IDChangeOT.ejs',miss);
  }else{
    response.redirect('/');
  }

})
//~~~~~~~~~~~~~~~~~~~~~~~~//
//エラー処理用//
app.get('/Seito_Lost',(request,response) =>{
  if(request.session.userID!=null){
    request.session.destroy();
  }
  if(Seito_ID!=null){
    delete Seito_ID;
  }
})

//~~~~~~~~~~~~~~~~~~~~~~~~//
} catch (e){
  if(e instanceof ReferenceError){
    response.redirect('/');
  }
}

app.listen(1234,() => console.log('ドバーッと'));
