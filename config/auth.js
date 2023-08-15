const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const {User} = require('../models/user');

module.exports = (passport) => {

    passport.use(new localStrategy({usernameField : 'email', passwordField: 'senha'}, async (email, senha, done) =>{
        try {
            const user = await User.findOne({where: { email } });
            if(!user) return done(null, false);

            const equal = await bcrypt.compare(senha, user.senha);

            if(equal) done(null, user.get());
            else done(null, false);

        } catch (error) {
            console.log('Error: ' + error);
            return done(error);
        }
    }));

    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done)=>{
        try {
            const user = await User.findByPk(id);
            if(!user) return done(null, false);

            done(null, user.get());
        } catch (error) {
            done(error, null);
        }
    });
};