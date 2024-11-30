const { DataTypes } = require("sequelize");
const User = require("../models/User");
const db = require("../db/conn");

const Post = db.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    summary: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    post_picture: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',  
        },
    },
});

Post.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.hasMany(Post, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });


module.exports = Post;