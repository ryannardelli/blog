module.exports = class HomeController {
    static showHome(req, res) {
        try {
            const successRegister = req.query.successRegister === 'true';
            const isAuthenticated = req.session.login; 
            console.log('Sessão de Login:', isAuthenticated);
            res.render('home/home', { showHeaderFooter: true, successRegister, isAuthenticated });
        } catch(err) {
            console.log('Erro ao renderizar a home');
        }
    }
}