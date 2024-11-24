module.exports = class AboutController {
    static showAbout(req, res) {
        try {
            const isAuthenticated = req.session.login; 
            res.render('about/about', { showHeaderFooter: true, isAuthenticated });
        } catch(err) {
            console.log('Erro ao renderizar o about');
        }
    }
}