const {sequelize, Sequelize, DataTypes, Model} = require('./db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(55),
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    }
}, {
    timestamps: false
});


//User.sync({force: true});

async function saveUser(req, res){
    const user = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    };
    bcrypt.genSalt(10, async (error, salt)=>{
        try {
            const hash = await bcrypt.hash(user.senha, salt);
            user.senha = hash;

            await User.create({
                nome : user.nome,
                email: user.email,
                senha: user.senha
            });
            
            res.redirect('/');
        } catch (error) {
            console.log('Error' + error);
        }
    });
}


module.exports = {saveUser};