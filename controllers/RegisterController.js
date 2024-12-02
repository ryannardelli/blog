const User = require('../models/User');

module.exports = class RegisterController {
    static showRegister(req, res) {
        try {
            res.render('register/register', { showHeaderFooter: false});
        } catch(err) {
            console.log('Erro ao renderizar o register');
        }
    }

    static async createUser(req, res) {
        try {
            console.log(req.body);

            const user = {
                name: req.body.name,
                email: req.body.email,
                function: req.body.function,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
                country: req.body.country,
            };
            await User.create(user);
            res.redirect('/?successRegister=true');
        } catch (err) {
            console.log('Erro ao criar usuário:', err);
            res.status(500).send('Erro ao criar usuário');
        }
    }
    
}