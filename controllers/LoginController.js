const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = class ContactController {
    static showPageLogin(req, res) {
        try {
            res.render('login/login', { showHeaderFooter: false });
        } catch(err) {
            console.log('Erro ao renderizar o login');
        }
    }

    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;
    
            const user = await User.findOne({ where: { email } });
    
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).render('login/login', {
                    showHeaderFooter: false,
                    error: 'Usuário ou senha inválidos.',
                });
            }
    
            req.session.login = true;
            req.session.userId = user.id;
    
            return res.redirect('/dashboard');
        } catch (err) {
            console.error('Erro ao processar o login:', err);
            return res.status(500).send('Erro interno do servidor.');
        }
    }
}