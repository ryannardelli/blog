module.exports = class HomeController {
    static showHome(req, res) {
        try {
            const successRegister = req.query.successRegister === 'true';
            res.render('home/home', { showHeaderFooter: true, successRegister });
        } catch(err) {
            console.log('Erro ao renderizar a home');
        }
    }
}