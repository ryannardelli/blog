module.exports = class DashboardController {

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

    static showPosts(req, res) {
        try {
            res.render('dashboard/feed', {
                layout: "dashboard"
            });
        } catch(err) {
            console.log('Erro ao renderizar o posts');
        }
    }

    static showForum(req, res) {
        try {
            res.render('dashboard/forum', {
                layout: "dashboard"
            });
        } catch(err) {
            console.log('Erro ao renderizar o fórum');
        }
    }

    static showReport(req, res) {
        try {
            res.render('dashboard/report', {
                layout: "dashboard"
            });
        } catch(err) {
            console.log('Erro ao renderizar o report');
        }
    }

    static showConfig(req, res) {
        try {
            res.render('dashboard/config', {
                layout: "dashboard"
            });
        } catch(err) {
            console.log('Erro ao renderizar o config');
        }
    }
}