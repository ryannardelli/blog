const User = require("../models/User");
const Post = require("../models/Post");

const moment = require("moment");
const { post } = require("../routes/homeRouter");

module.exports = class DashboardController {
  static async showDashboardMain(req, res) {
    try {
      const user = await User.findByPk(req.session.userId);

      if (!user) {
        return res.status(404).send("Usuário não encontrado.");
      }

      const nameParts = user.name.split(" ");
      const firstName = nameParts[0];

      res.render("dashboard/dashboard", {
        layout: "dashboard",
        user: user.toJSON(),
        firstName,
      });
    } catch (err) {
      console.log("Erro ao renderizar o dashboard", err);
    }
  }

  static async showProfile(req, res) {
    const user = await User.findByPk(req.session.userId);

    if (!user) {
      return res.status(404).send("Usuário não encontrado.");
    }

    const nameParts = user.name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];

    const formattedDate = moment(user.updatedAt).format(
      "DD [de] MMMM [de] YYYY"
    );

    try {
      res.render("dashboard/profile", {
        layout: "dashboard",
        user: user.toJSON(),
        firstName,
        lastName,
        formattedDate,
      });
    } catch (err) {
      console.log("Erro ao renderizar o profile", err);
    }
  }

  static async showPosts(req, res) {
    const user = await User.findByPk(req.session.userId);
    const nameParts = user.name.split(" ");
    const firstName = nameParts[0];
    try {
      res.render("dashboard/feed", {
        layout: "dashboard",
        user: user.toJSON(),
        firstName,
      });
    } catch (err) {
      console.log("Erro ao renderizar o posts");
    }
  }

  static async showForum(req, res) {
    const user = await User.findByPk(req.session.userId);
    const nameParts = user.name.split(" ");
    const firstName = nameParts[0];
    try {
      res.render("dashboard/forum", {
        layout: "dashboard",
        user: user.toJSON(),
        firstName,
      });
    } catch (err) {
      console.log("Erro ao renderizar o fórum");
    }
  }

  static async showReport(req, res) {
    const user = await User.findByPk(req.session.userId);
    const nameParts = user.name.split(" ");
    const firstName = nameParts[0];
    try {
      res.render("dashboard/report", {
        layout: "dashboard",
        user: user.toJSON(),
        firstName,
      });
    } catch (err) {
      console.log("Erro ao renderizar o report");
    }
  }

  static async showConfig(req, res) {
    const user = await User.findByPk(req.session.userId);
    const nameParts = user.name.split(" ");
    const firstName = nameParts[0];
    try {
      res.render("dashboard/config", {
        layout: "dashboard",
        user: user.toJSON(),
        firstName,
      });
    } catch (err) {
      console.log("Erro ao renderizar o config");
    }
  }

  static async showCreatePost(req, res) {
    try {
      const user = await User.findByPk(req.session.userId);

      if (!user) {
        return res.status(404).send("Usuário não encontrado.");
      }

      res.render("dashboard/createPost", { user: user.get() });
    } catch (e) {
      console.log("Erro ao criar página de criação de post", e);
    }
  }

  static async SendPost(req, res) {
    const { title, summary, content, category, userId } = req.body;

    console.log(req.body);

    if (!userId) {
      return res
        .status(400)
        .send("userId não encontrado no corpo da requisição.");
    }

    try {
      await Post.create({
        title,
        summary,
        content,
        category,
        userId,
      });

      res.redirect("/dashboard/feed");
    } catch (error) {
      console.error("Erro ao criar post:", error);
      res.status(500).send("Erro ao processar a requisição.");
    }
  }

  static async showPosts(req, res) {
    try {
      const user = await User.findByPk(req.session.userId);
  
      const posts = await Post.findAll({
        where: {
          userId: user.id, 
        },
      });
      
  
      const postsPlain = posts.map((post) => post.get());
  
      res.render("dashboard/feed", {
        layout: "dashboard",
        posts: postsPlain,
      });
    } catch (e) {
      console.log("Erro ao carregar os posts", e);
      res.status(500).send("Erro ao carregar os posts.");
    }
  }
  
};
