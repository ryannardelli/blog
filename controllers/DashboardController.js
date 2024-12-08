const User = require("../models/User");
const Post = require("../models/Post");
const { Op } = require("sequelize");
const path = require("path");

const moment = require("moment");

module.exports = class DashboardController {
  static async showDashboardMain(req, res) {
    try {
      const user = await User.findByPk(req.session.userId);
      const id = req.session.userId;

      if (!user) {
        return res.status(404).send("Usuário não encontrado.");
      }

      const postCount = await Post.count({
        where: { userId: id },
      });

      // Somando o like_count de todos os posts
      const likeCount = await Post.sum("like_count", {
        where: { userId: id },
      });

      console.log("Likes totais:", likeCount);

      res.render("dashboard/dashboard", {
        layout: "dashboard",
        user: user.toJSON(),
        postCount,
        likeCount,
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

    const formattedDate = moment(user.updatedAt).format(
      "DD [de] MMMM [de] YYYY"
    );

    try {
      res.render("dashboard/profile", {
        layout: "dashboard",
        user: user.toJSON(),
        formattedDate,
      });
    } catch (err) {
      console.log("Erro ao renderizar o profile", err);
    }
  }

  static async showPosts(req, res) {
    const user = await User.findByPk(req.session.userId);
    try {
      res.render("dashboard/feed", {
        layout: "dashboard",
        user: user.toJSON(),
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
    try {
      res.render("dashboard/report", {
        layout: "dashboard",
        user: user.toJSON(),
      });
    } catch (err) {
      console.log("Erro ao renderizar o report");
    }
  }

  static async showConfig(req, res) {
    const user = await User.findByPk(req.session.userId);
    try {
      res.render("dashboard/config", {
        layout: "dashboard",
        user: user.toJSON(),
      });
    } catch (err) {
      console.log("Erro ao renderizar o config");
    }
  }

  static async updateProfile(req, res) {
    try {
      const { userId, name, email, firstName, lastName, bio, country, role } =
        req.body;

      const userData = {
        id: userId,
        name,
        email,
        firstName,
        lastName,
        bio,
        country,
        role,
      };

      console.log(req.body);

      await User.update(userData, { where: { id: userId } });
      res.redirect("/dashboard/config");
    } catch (e) {
      console.log("Erro ao atualizar o perfil", e);
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
    try {
      const { userId, title, summary, content, category } = req.body;

      if (req.files && req.files.image) {
        const image = req.files.image;

        // Gerar o caminho do arquivo
        const uploadPath = path.join(__dirname, "../public/images", image.name);

        // Mover o arquivo para o diretório de uploads
        image.mv(uploadPath, async (err) => {
          if (err) {
            return res.status(500).send("Erro ao fazer upload da imagem.");
          }

          // Salvar o caminho da imagem no banco de dados
          const post = await Post.create({
            userId,
            title,
            summary,
            content,
            category,
            post_picture: `/images/${image.name}`, // Caminho relativo para o frontend
          });

          res.redirect("/dashboard/feed");
        });
      } else {
        const post = await Post.create({
          userId,
          title,
          summary,
          content,
          category,
          post_picture: "/images/default.jpg", // Imagem padrão caso não haja upload
        });

        res.redirect("/dashboard/feed");
      }
    } catch (error) {
      console.error("Erro ao criar post:", error);
      res.status(500).send("Erro ao criar o post");
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
        user: user.toJSON(),
      });
    } catch (e) {
      console.log("Erro ao carregar os posts", e);
      res.status(500).send("Erro ao carregar os posts.");
    }
  }

  static async showEditPost(req, res) {
    try {
      const postId = req.params.id;
      const post = await Post.findByPk(postId);

      if (!post) {
        return res.status(404).send("Post não encontrado");
      }

      const user = await User.findOne({
        include: {
          model: Post,
          attributes: ["id", "title", "summary", "content"],
        },
        where: { id: post.userId },
      });

      if (!user) {
        return res.status(404).send("Usuário não encontrado");
      }

      const plainPost = post.get({ plain: true });
      const plainUser = user.get({ plain: true });

      res.render("dashboard/editPost", { post: plainPost, user: plainUser });
    } catch (err) {
      console.log("Erro ao renderizar o editPost", err);
      res.status(500).send("Erro ao carregar o formulário de edição");
    }
  }

  static async editPost(req, res) {
    try {
      const postId = req.params.id;

      const { title, summary, content } = req.body;

      const post = await Post.findByPk(postId);

      if (!post) {
        return res.status(404).send("Post não encontrado");
      }

      await post.update({ title, summary, content });

      res.redirect("/dashboard/feed");
    } catch (e) {
      console.error("Erro ao editar o post", e);
      res.status(500).send("Erro ao editar o post");
    }
  }

  static async deletePost(req, res) {
    const id = req.params.id;
    await Post.destroy({ where: { id: id } });
    res.redirect("/dashboard/feed");
  }

  static async showPostView(req, res) {
    try {
      const postId = req.params.id;
      const post = await Post.findByPk(postId);

      if (!post) {
        return res.status(404).send("Post não encontrado");
      }

      const user = await User.findOne({
        include: {
          model: Post,
          attributes: ["id", "title", "summary", "content"],
        },
        where: { id: post.userId },
      });

      const plainPost = post.get({ plain: true });
      const plainUser = user.get({ plain: true });

      if (!user) {
        return res.status(404).send("Usuário não encontrado");
      }

      res.render("dashboard/postView", { post: plainPost, user: plainUser });
    } catch (err) {
      console.log("Erro ao renderizar o viewPost", err);
      res.status(500).send("Erro ao carregar o view post");
    }
  }

  static async showPostViewPerHome(req, res) {
    try {
      const postId = req.params.id;
      const post = await Post.findByPk(postId);

      if (!post) {
        return res.status(404).send("Post não encontrado");
      }

      const user = await User.findOne({
        include: {
          model: Post,
          attributes: ["id", "title", "summary", "content"],
        },
        where: { id: post.userId },
      });

      const plainPost = post.get({ plain: true });
      const plainUser = user.get({ plain: true });

      if (!user) {
        return res.status(404).send("Usuário não encontrado");
      }

      res.render("dashboard/postViewHome", {
        post: plainPost,
        user: plainUser,
      });
    } catch (err) {
      console.log("Erro ao renderizar o viewPost", err);
      res.status(500).send("Erro ao carregar o view post");
    }
  }

  static async updateProfilePicture(req, res) {
    try {
      const { userId } = req.body;

      if (req.files && req.files.profile_picture) {
        const image = req.files.profile_picture;

        const uploadPath = path.join(__dirname, "../public/images", image.name);

        image.mv(uploadPath, async (err) => {
          if (err) {
            console.error("Erro ao fazer upload da imagem:", err);
            return res.status(500).send("Erro ao fazer upload da imagem.");
          }

          await User.update(
            { profile_picture: `/images/${image.name}` },
            { where: { id: userId } }
          );

          res.redirect("/dashboard/config");
        });
      } else {
        res.status(400).send("Nenhuma imagem foi enviada.");
      }
    } catch (error) {
      console.error("Erro ao atualizar a imagem de perfil:", error);
      res.status(500).send("Erro ao atualizar a imagem de perfil.");
    }
  }

  static async uploadImagePost(req, res) {
    try {
      if (req.files && req.files.post_picture) {
        const image = req.files.post_picture;
        const postId = req.params.id;

        const uploadPath = path.join(__dirname, "../public/images", image.name);

        image.mv(uploadPath, async (err) => {
          if (err) {
            console.error("Erro ao fazer upload da imagem:", err);
            return res.status(500).send("Erro ao fazer upload da imagem.");
          }

          await Post.update(
            { post_picture: `/images/${image.name}` },
            { where: { id: postId } }
          );

          res.redirect("/dashboard/feed");
        });
      } else {
        res.status(400).send("Nenhuma imagem foi enviada.");
      }
    } catch (error) {
      console.error("Erro ao atualizar a imagem de perfil:", error);
      res.status(500).send("Erro ao atualizar a imagem de perfil.");
    }
  }

  static async searchUser(req, res) {
    const { search } = req.query;
    const result = await User.findAll({
      where: {
        name: {
          [Op.like]: `%${search}%`,
        },
      },
    });
    return res.json(result);
  }

  static async userProfile(req, res) {
    const id = req.params.id;
  
    try {
      // Supondo que você tenha um modelo User e Post para buscar as postagens
      const user = await User.findByPk(id); // Busca o usuário
      const posts = await Post.findAll({ where: { userId: id } }); // Busca as postagens do usuário
  
      if (!user) {
        return res.status(404).send("Usuário não encontrado");
      }

      const postCount = await Post.count({
        where: { userId: id },
      });
  
      // Passa o usuário e as postagens (com imagens) para o template
      res.render("dashboard/userView", {
        user: user.toJSON(),
        posts: posts.map(post => post.toJSON()),
        postCount // Converte as postagens para JSON
      });
    } catch (error) {
      console.error("Erro ao buscar usuário ou postagens: ", error);
      res.status(500).send("Erro ao renderizar a página do usuário");
    }
  }
};
