const Post = require("../models/Post");
const User = require("../models/User");
const moment = require("moment");

module.exports = class HomeController {
  static async showHome(req, res) {
    try {
      const successRegister = req.query.successRegister === "true";
      const isAuthenticated = req.session.login;

      // Pegar os 3 posts para exibição geral
      const posts = await Post.findAll({
        limit: 3, // Limita a 3 posts
        order: [["createdAt", "DESC"]], // Ordena os posts pela data de criação
      });

      const postsPlain = posts.map((post) => post.get());

      // Pegar o post em destaque (o mais recente)
      const featuredPost = await Post.findOne({
        order: [["createdAt", "DESC"]],
        include: User,
      });
      const featuredPostPlain = featuredPost ? featuredPost.get() : null;

      const formattedDate = moment(featuredPostPlain.createdAt).format(
        "DD [de] MMMM [de] YYYY"
      );

      // Enviar ambos ao template
      res.render("home/home", {
        showHeaderFooter: true,
        successRegister,
        isAuthenticated,
        posts: postsPlain,
        featuredPost: featuredPostPlain,
        UserFirstName: featuredPostPlain.User.firstName,
        UserLastName: featuredPostPlain.User.lastName,
        isLoggedIn: true,
        formattedDate,
      });
    } catch (err) {
      console.log("Erro ao renderizar a home", err);
      res.status(500).send("Erro ao carregar a página inicial");
    }
  }

  static async incrementLike(req, res) {
    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post não encontrado" });
      }
      post.like_count += 1;
      await post.save();
      res.json({ like_count: post.like_count });
    } catch (error) {
      console.error("Erro ao adicionar like:", error);
      res.status(500).json({ message: "Erro ao atualizar like" });
    }
  }

  static async decrementLike(req, res) {
    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post não encontrado" });
      }
      if (post.like_count > 0) {
        post.like_count -= 1;
        await post.save();
      }
      res.json({ like_count: post.like_count });
    } catch (error) {
      console.error("Erro ao remover like:", error);
      res.status(500).json({ message: "Erro ao atualizar like" });
    }
  }
};
