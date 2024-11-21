module.exports = class ContactController {
    static showContact(req, res) {
        try {
            res.render('contact/contact', { showHeaderFooter: true });
        } catch(err) {
            console.log('Erro ao renderizar o contact');
        }
    }
}