module.exports = class HomeController {
    static  showHome(req, res) {
        try {
            const successRegister = req.query.successRegister === 'true';
            const isAuthenticated = req.session.login; 
            res.render('home/home', { showHeaderFooter: true, successRegister, isAuthenticated });
        } catch(err) {
            console.log('Erro ao renderizar a home');
        }
    }
}