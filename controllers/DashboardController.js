module.exports = class ContactController {

    static showDashboardMain(req, res) {
        try {
            res.render('dashboard/dashboard', {
                layout: "dashboard",
            });
        } catch(err) {
            console.log('Erro ao renderizar o dashboard');
        }
    }

    static showProfile(req, res) {
        try {
            res.render('dashboard/profile', {
                layout: "dashboard"
            });
        } catch(err) {
            console.log('Erro ao renderizar o profile');
        }
    }
}