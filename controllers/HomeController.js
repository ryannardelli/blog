const Post = require("../models/Post");
module.exports = class HomeController {
    static async showHome(req, res) {
        try {
            const successRegister = req.query.successRegister === 'true';
            const isAuthenticated = req.session.login;
            const posts = await Post.findAll({
                limit: 3, // Limita a 3 posts
                order: [['createdAt', 'DESC']] // Ordena os posts pela data de criação (opcional)
            });
            
            const postsPlain = posts.map(post => post.get());

            res.render('home/home', { 
                showHeaderFooter: true, 
                successRegister, 
                isAuthenticated,
                posts: postsPlain
            });
        } catch (err) {
            console.log('Erro ao renderizar a home', err);
            res.status(500).send('Erro ao carregar a página inicial');
        }
    }
};
