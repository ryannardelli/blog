module.exports = class ContactController {
    static showContact(req, res) {
        try {
            const isAuthenticated = req.session.login; 
            res.render('contact/contact', { showHeaderFooter: true, isAuthenticated });
        } catch(err) {
            console.log('Erro ao renderizar o contact');
        }
    }
}