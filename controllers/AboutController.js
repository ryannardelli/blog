module.exports = class AboutController {
    static showAbout(req, res) {
        try {
            res.render('about/about', { showHeaderFooter: true });
        } catch(err) {
            console.log('Erro ao renderizar o about');
        }
    }
}