const express = require('express');
const {engine} = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const {saveUser} = require('./models/user')

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine('handlebars', engine({
    defaultLayout: 'main',
    runtimeOptions:{
        allowProtoMethodsByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));

app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
    res.render('index');
});
app.get('/login', (req, res)=>{
    res.render('login');
});
app.get('/registar', (req, res)=>{
    res.render('registrar');
});
app.post('/registar', (req, res)=>{
    if(req.body.senha === req.body.senha2) saveUser(req, res);
    else res.redirect('/registar');
});

app.set('port', process.env.PORT || 8081);
app.listen(app.get('port'), ()=> console.log(`server running on port ${app.get('port')}`));