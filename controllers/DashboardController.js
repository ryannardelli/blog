const User = require('../models/User');
const moment = require('moment');
module.exports = class DashboardController {

    static  showDashboardMain(req, res) {
        try {
            res.render('dashboard/dashboard', {
                layout: "dashboard",
            });
        } catch(err) {
            console.log('Erro ao renderizar o dashboard');
        }
    }

    static async showProfile(req, res) {
        const user = await User.findByPk(req.session.userId);

        if (!user) {
            return res.status(404).send('Usuário não encontrado.');
        }

        const nameParts = user.name.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts[nameParts.length - 1];

        const formattedDate = moment(user.updatedAt).format('DD [de] MMMM [de] YYYY');

        try {
            res.render('dashboard/profile', {
                layout: "dashboard", user: user.toJSON(), firstName, lastName, formattedDate
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