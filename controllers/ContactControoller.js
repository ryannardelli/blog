module.exports = class ContactController {
    static showContact(req, res) {
        try {
            res.render('contact/contact');
        } catch(err) {
            console.log('Erro ao renderizar o contact');
        }
    }
}