const { token } = require('morgan');
var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: 'noreply@verzeo.in',
        clientId: '908473304175-j3gku1j2h7u9rf78dleh833h4h34dh2m.apps.googleusercontent.com',
        clientSecret: 's-C0h9FwzzvpG9pG3Tj99-hC',
        refreshToken: '1//04U90l7suVRRsCgYIARAAGAQSNwF-L9IrWiYedgZ0JOk1eGZOM99jj5zZTrUn2XNu_dd6DQIdWPZWcyEKYAj5t0qIRMtelC3al7c',
    }
});




const sendResetPasswordMail = async (arg) => {
    var mailOptions = {
        from:`JobPortal <noreply@jobPortal.com>` ,
        to: `${arg.to}`,
        subject: `${arg.subject}`,
        html: `  Hello ${arg.name},
        <br>
        <br>

        <strong> Greetings from Job Portal! </strong>
        <br>
        <br>

        click on this <a href="http://localhost:3000/newPassword/${arg.token}"> link </a> to create a new password</h5>
        <br>
        <br>
           <div> Regards,
               <br>
               Job Portal Team 
           </div>`
    };
    await sendMail(mailOptions)
    console.log('success mail sent')
}

const sendMail = async (mailOptions) => {
    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendResetPasswordMail
}