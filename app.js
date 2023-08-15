const express = require('express');
const passport = require('passport');
const {engine} = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const {saveUser} = require('./models/user')
const app = express();

app.use(session({
    secret: '123456789',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
    res.locals.user = req.user || null;
    next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine('handlebars', engine({
    defaultLayout: 'main',
    runtimeOptions:{
        allowProtoMethodsByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));

// Require and configure passport strategies
require('./config/auth')(passport);

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

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

app.get('/logout', (req, res) => {
    req.logOut((err)=>{
        if(err){
            res.redirect('/');
            console.log('Logout');
        }
        else{ 
            res.redirect('/');
            console.log('erro');
        }
    });
});
app.set('port', process.env.PORT || 8081);
app.listen(app.get('port'), ()=> console.log(`server running on port ${app.get('port')}`));