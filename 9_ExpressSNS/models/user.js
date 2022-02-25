const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true,
            },
            nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'local',
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.User.hasMany(db.Post);
        db.User.belongsToMany(db.User, {
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Follow,'
        });
        db.User.belongsToMany(db.User, {
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Follow',
        });
    }
}

// provider가 local이면 로컬 로그인, kakao면 카카오 로그인
// User모델과 Post모델은 1:N 관계 = this.hasMany로 연결(user.getPosts, user.addPosts같은 관계 메서드들 생성)
// 팔로잉은 N:M 관계(User과 User간) -> N:M 관계에서는 as옵션도 넣어줘야..
// include시에도 as에 같은 값 넣으면 관계 쿼리 작동