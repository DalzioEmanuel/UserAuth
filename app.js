const express = require('express');
const {engine} = require('express-handlebars');
const path = require('path');
const session = require('express-session');

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
app.set('port', process.env.PORT || 8081);
app.listen(app.get('port'), ()=> console.log(`server running on port ${app.get('port')}`));