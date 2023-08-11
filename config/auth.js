const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Passport = require('passport');
const {User} = require('../models/user');

module.exports = (passport = Passport) => {
    
    passport.use(new localStrategy({usernameField : 'email', passwordField: 'senha'}, async (email, senha, done) =>{
        try {
            let user = await User.findOne({
                where: {
                    email: email
                }
            });

            if(!user) return done(null, false, {message: 'Esta conta não existe'});

            const equal = await bcrypt.compare(senha, user.getDataValue('senha'));

            if(equal) done(null, user.get());
            else done(null, false, {message: 'Senha incorreta'});

        } catch (error) {
            console.log('Error: ' + error);
            return done(error);
        }
    }));

    passport.serializeUser((user, done)=>{
        done(null, user.getDataValue('id'));
    });

    passport.deserializeUser(async (id, done)=>{
        try {
            let user = await User.findOne({
                where: {
                    id: id
                }
            });

            if(!user) return done(null, false);

            done(null, user.get());
        } catch (error) {
            done(error, null);
        }
    });
};