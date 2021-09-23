const nodemailer = require("nodemailer");
// const htmlToText = require('html-to-text');
// const pug = require('pug');
const fs = require("fs");

const { DEV_MAIL_USER, DEV_MAIL_PORT, DEV_MAIL_PASS, DEV_MAIL_HOST } = process.env;



//    var mailOptions = {
//     from: 'nickdavis3188@gmail.com',
//     to:'nyaknodavis318@gmail.com',
// subject:"Reset password",
// text:`you are receiving this because you (or someone else) have requested the reset of password \n,
//     please click the on the following link paste it into your browser to complete the process \n
//     https://braveblog2.herokuapp.com/resetPWD# \n\n
//     if you did not request this, please ignore this email and your password will remaind unchange.
//     `
// // }
// transporter.sendMail(mailOptions,function(err,info){
//     if(err){
//      console.log(err)
//     }else{
//       console.log(info.id)
//     }
// })

module.exports = class Email {
  constructor(user,resetHost) {
    this.to = user.email;
    this.firstName = user.fullName.split(' ')[0];
    this.from = `${(process.env.NODE_ENV !== "production")? DEV_MAIL_USER : process.env.EMAIL_USERNAME}`;
    this.resetlink = resetHost;
  }

  //read file Async
  readFilePro(path){
    return new Promise((result,reject)=>{
      fs.readFile(path,"utf-8",(err,data)=>{
        if(err){
          reject(err)
        } else{
          result(data)
        }
      })
    })
  }

  newTransport() {
    if (process.env.NODE_ENV !== 'production') { 
      // Sendgrid
      return(nodemailer.createTransport({
        host:DEV_MAIL_HOST,
        port: DEV_MAIL_PORT,
        auth: {
          user: DEV_MAIL_USER,
          pass: DEV_MAIL_PASS
        }
      }));
    }else{
      return(nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass:process.env.EMAIL_PASSWORD
        }
      }));
    }
  }
  myTransporter(){
    return (nodemailer.createTransport({
      port: 465,               // true for 465, false for other ports
      host: "smtp.gmail.com",
         auth: {
              user: 'nickdavis3188@gmail.com',
              pass: 'nickdavis123456',
           },
      secure: true,
      }));
  }
 
  // Send the actual email
  // async send(template, subject) {
  //   // 1) Render HTML based on a pug template
  //   const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
  //     firstName: this.firstName,
  //     url: this.url,
  //     subject
  //   });

  

  //   // 2) Define email options
  //   const mailOptions = {
  //     from:this.from,
  //     to: this.to,
  //     subject,
  //     html,
  //     text: htmlToText.fromString(html)
  //   };

  //   // 3) Create a transport and send email
  //   await this.newTransport().sendMail(mailOptions);
  // }


async send(subject){
  // 1) rendering html
  let htmlTxt = await this.readFilePro(`${__dirname}/../views/html/welcome.html`)


  // 2) replacing the parameters with real values
  let setName = htmlTxt.replace(/{%NAME%}/g,this.firstName)
  console.log(setName)


  // 3) Define email options
const mailOptions1 = {
  from: this.from,
  to: this.to,
  subject,
  html:setName,
  text:"Welcome to Kings Assembly"
};

// 4) Create a transport and send email
await this.myTransporter().sendMail(mailOptions1);

 
}


  //send email for password reset code
  async send2(subject){
    // 1) rendering html
    let htmlTxt = await this.readFilePro(`${__dirname}/../views/html/resetlink.html`)


    // 2) replacing the parameters with real values
  
    let setFirstName2 = htmlTxt.replace(/{%NAME%}/g,this.firstName)
    let setCode = setFirstName2.replace(/{%RESETLINK%}/g,this.resetlink)
    let setCode2 = setCode.replace(/{%RESETCODE%}/g,this.resetlink)
    // let setCode3 = setCode.replace(/{%RESETLINK%}/g,this.resetlink)
    // let setCode4 = setCode3.replace(/{%RESETLINK2%}/g,this.resetlink)
    // const htmlcode = setCode 
    // console.log(htmlcode)

    
    // 3) Define email options
  const mailOptions = {
    from: this.from,
    to: this.to,
    subject,
    html:setCode2,
    text:"Password reset link"
  };

  // 4) Create a transport and send email
  await this.myTransporter().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Kings Assembly DTMDMS!');
  }

  async sendPasswordReset() {
    await this.send2(
      'Your password reset Link'
    );
  }
};
