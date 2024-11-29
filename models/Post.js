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
        defaultValue: "https://cdn.gencraft.com/prod/user/0d8be364-26fb-4d84-a1ba-1e9f0d57f613/0da97aa2-8344-4577-9e44-ca32d92c0706/image/image0_0.jpg?Expires=1740630006&Signature=Bzjfq~QEXMuQJFpWNs7MR~rqDt8LPVKmuNVtOzHyxeSo0C~iCobZW-dHTNzOcb9sb9rC3Vi8F5C122B6gAH6uXJfycBbDY51hfXG4SR4oH8iuvVM0lVH255LADmLGYsAxB7idOM~ztiknli5Fnrl4rCdBIkXnV2sIb4s1PuBWiMl3~jTRJV8Qvy4428miCf5NPOCd9XsiZco8Ssd8MgUk4UsOuP~nuXLVB2Zp~vawoqlbeeagwPY2IwrZ8e1yz-QlAuPQubrSY08lffPJ9~-3dKnuFTBpC635jHH6m9KDtiqzYhwqJZ5h1df~ZDYY-AqvF9hr78MIID2i01iql0kAw__&Key-Pair-Id=K3RDDB1TZ8BHT8",
        allowNull: true,
        validate: {
            isUrl: true,
        },
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