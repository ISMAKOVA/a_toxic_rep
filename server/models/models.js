const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Users = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: false,},
    avatar:{type: DataTypes.STRING, unique: false, allowNull: true},
    email: {type: DataTypes.STRING, unique: true, },
    password: {type: DataTypes.STRING}
});

const Users_VK =  sequelize.define('user_vk',{
    id: {type: DataTypes.INTEGER, primaryKey: true},
    // wall_id: {type: DataTypes.INTEGER, unique: true},
    username: {type: DataTypes.STRING, unique: true},
    avatar:{type: DataTypes.STRING, unique: false, },
    privacy: {type: DataTypes.BOOLEAN, allowNull: false},
    // toxicity_id: {type: DataTypes.INTEGER}
});

const Groups_VK =  sequelize.define('group_vk',{
    id: {type: DataTypes.INTEGER, primaryKey: true},
    // wall_id: {type: DataTypes.INTEGER, unique: true},
    info: {type: DataTypes.STRING, unique: true},
    avatar:{type: DataTypes.STRING, unique: false, },
    privacy: {type: DataTypes.BOOLEAN},
    // toxicity_id: {type: DataTypes.INTEGER}
});

const Friends_connection =  sequelize.define('friends_connection',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // user_id: {type: DataTypes.INTEGER},
    // friend_id: {type: DataTypes.INTEGER},
    is_friend: {type: DataTypes.BOOLEAN},
});

const Subscribers = sequelize.define('subscribers',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // user_id: {type: DataTypes.INTEGER},
    // group_id: {type: DataTypes.INTEGER},
    is_admin: {type: DataTypes.BOOLEAN},
});


const Posts_VK = sequelize.define('post_vk',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // author_id: {type: DataTypes.INTEGER},
    author_type : {type: DataTypes.STRING},
    // wall_id: {type: DataTypes.INTEGER},
    text: {type: DataTypes.STRING},
    picture:{type:DataTypes.STRING},
    // toxicity_id: {type: DataTypes.INTEGER}
});

const Answers = sequelize.define('answers',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // comment_id: {type: DataTypes.INTEGER},
    // answer_id: {type: DataTypes.INTEGER},
});

const Comments_VK = sequelize.define('comments_vk',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // post_id: {type: DataTypes.INTEGER},
    // author_id: {type: DataTypes.INTEGER},
    author_type: {type: DataTypes.STRING},//0 - пользователь 1 - группа
    text: {type: DataTypes.STRING},
    picture:{type:DataTypes.STRING},
    // toxicity_id: {type: DataTypes.INTEGER}
});

const Toxicity_types = sequelize.define('toxicity_type',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    toxicity_type: {type: DataTypes.STRING},
    is_toxic: {type: DataTypes.BOOLEAN},
    is_rude: {type: DataTypes.BOOLEAN},
    is_negative : {type: DataTypes.BOOLEAN},
    contains_NER: {type: DataTypes.BOOLEAN},
});

const Favorite_groups =  sequelize.define('favorite_groups',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    info:{type: DataTypes.STRING, allowNull: true}
});

Users.hasMany(Users_VK);
Users_VK.belongsTo(Users);

Users.hasMany(Favorite_groups);
Favorite_groups.belongsTo(Users);

Favorite_groups.hasMany(Groups_VK);
Groups_VK.belongsTo(Favorite_groups);

Users.hasMany(Groups_VK);
Groups_VK.belongsTo(Users);

Users_VK.hasMany(Friends_connection);
Friends_connection.belongsTo(Users_VK);

Users_VK.hasMany(Subscribers);
Subscribers.belongsTo(Users_VK);

Users_VK.hasMany(Toxicity_types);
Toxicity_types.belongsTo(Users_VK);

Groups_VK.hasMany(Subscribers);
Subscribers.belongsTo(Groups_VK);

Groups_VK.hasMany(Toxicity_types);
Toxicity_types.belongsTo(Groups_VK);

Posts_VK.hasMany(Toxicity_types);
Toxicity_types.belongsTo(Posts_VK);

Comments_VK.hasMany(Toxicity_types);
Toxicity_types.belongsTo(Comments_VK);

Users_VK.hasMany(Posts_VK);
Posts_VK.belongsTo(Users_VK);

Groups_VK.hasMany(Posts_VK);
Posts_VK.belongsTo(Groups_VK);

Users_VK.hasMany(Comments_VK);
Comments_VK.belongsTo(Users_VK);

Groups_VK.hasMany(Comments_VK);
Comments_VK.belongsTo(Groups_VK);

Posts_VK.hasMany(Comments_VK);
Comments_VK.belongsTo(Posts_VK);

Comments_VK.hasMany(Answers);
Answers.belongsTo(Comments_VK);



module.exports = {
    Users,
    Users_VK,
    Groups_VK,
    Friends_connection,
    Subscribers,
    Posts_VK,
    Answers,
    Comments_VK,
    Toxicity_types,
    Favorite_groups
};

