module.exports = class ContactController {
    static showPageLogin(req, res) {
        try {
            res.render('login/login', { showHeaderFooter: false });
        } catch(err) {
            console.log('Erro ao renderizar o login');
        }
    }
}