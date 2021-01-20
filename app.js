const express = require ('express');
const bodyParser = require('body-parser');
const path = require('path')
const nodemailer = require('nodemailer');
const { rename } = require('fs');

const app = express();


//view engine
app.set('view engine', 'ejs');

//Static Folder
app.use('/public', express.static(path.join(__dirname, 'public')));

//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res)=>{
res.render('index')
});


app.post('/send', (req, res)=>{
    const outPut = `
    <p> You have a new contact request</p>
    <h3> Contact Details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Subject: ${req.body.subject}</li>
    <li>Email: ${req.body.email}</li> 
    </ul>
    <h3> Message</h3>
    <p> ${req.body.message}</p>
    `;
    console.log(outPut)

   
    let transporter = nodemailer.createTransport({
        host: 'mail.bulklineltd.com',
        port: 587,
        secure: false,
        auth:{
            user: 'sam@bulklineltd.com',
            pass: ';5O)3k42!}V$'
        },
        tls:{
            rejectUnauthorized:false
        }
    });


     //set up email data with unicode symbols
    let mailOptions = {
        from:'"Message From Samuel Olatunji Profile"<sam@bulklineltd.com>',
        to:'olasam4liv@gmail.com',
        subject:'Message From Samuel Olatunji Profile',
        text:'Hello World',
        html:outPut
    }
    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
           return console.log(error);
        }
        console.log('Message Sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('index', 
        {msg:'Your Message Has Been Successfully Sent, We would get back to you in due course'}
        );

    });

});
let PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log('Server started..'))