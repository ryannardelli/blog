module.exports = class HomeController {
    static showHome(req, res) {
        try {
            res.render('home/home');
        } catch(err) {
            console.log('Erro ao renderizar a home');
        }
    }
}