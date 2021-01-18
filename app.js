const express = require ('express');
const bodyParser = require('body-parser');
const path = require('path')
const nodemailer = require('nodemailer');

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


app.listen(3000, ()=> console.log('Server Started..'))