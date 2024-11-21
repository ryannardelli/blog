module.exports = class ContactController {

    static showDashboardMain(req, res) {
        try {
            res.render('dashboard/dashboard', { showHeaderFooter: false });
        } catch(err) {
            console.log('Erro ao renderizar o dashboard');
        }
    }
}