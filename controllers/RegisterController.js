module.exports = class ContactController {
    static showRegister(req, res) {
        try {
            res.render('register/register', { showHeaderFooter: false });
        } catch(err) {
            console.log('Erro ao renderizar o register');
        }
    }
}