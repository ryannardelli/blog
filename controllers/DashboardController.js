const User = require('../models/User');
const moment = require('moment');

module.exports = class DashboardController {

    static async showDashboardMain(req, res) {
        try {
            const user = await User.findByPk(req.session.userId);

            if (!user) {
                return res.status(404).send('Usuário não encontrado.');
            }

            const nameParts = user.name.split(' ');
            const firstName = nameParts[0];

            res.render('dashboard/dashboard', {
                layout: "dashboard",
                user: user.toJSON(),
                firstName,
            });
        } catch (err) {
            console.log('Erro ao renderizar o dashboard', err);
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
                layout: "dashboard",
                user: user.toJSON(),
                firstName,
                lastName,
                formattedDate
            });
        } catch (err) {
            console.log('Erro ao renderizar o profile', err);
        }
    }

    static async showPosts(req, res) {
        const user = await User.findByPk(req.session.userId);
        const nameParts = user.name.split(' ');
        const firstName = nameParts[0];
        try {
            res.render('dashboard/feed', {
                layout: "dashboard", user: user.toJSON(), firstName
            });
        } catch (err) {
            console.log('Erro ao renderizar o posts');
        }
    }

    static async showForum(req, res) {
        const user = await User.findByPk(req.session.userId);
        const nameParts = user.name.split(' ');
        const firstName = nameParts[0];
        try {
            res.render('dashboard/forum', {
                layout: "dashboard", user: user.toJSON(), firstName
            });
        } catch (err) {
            console.log('Erro ao renderizar o fórum');
        }
    }

    static async showReport(req, res) {
        const user = await User.findByPk(req.session.userId);
        const nameParts = user.name.split(' ');
        const firstName = nameParts[0];
        try {
            res.render('dashboard/report', {
                layout: "dashboard", user: user.toJSON(), firstName
            });
        } catch (err) {
            console.log('Erro ao renderizar o report');
        }
    }

    static async showConfig(req, res) {
        const user = await User.findByPk(req.session.userId);
        const nameParts = user.name.split(' ');
        const firstName = nameParts[0];
        try {
            res.render('dashboard/config', {
                layout: "dashboard", user: user.toJSON(), firstName
            });
        } catch (err) {
            console.log('Erro ao renderizar o config');
        }
    }
}
