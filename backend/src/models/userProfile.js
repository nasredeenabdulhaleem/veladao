module.exports = (sequelize, DataTypes) => {
    const UserProfile = sequelize.define(
        "UserProfile",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            bio: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            avatarUrl: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            timestamps: true,
        }
    );

    UserProfile.associate = (models) => {
        UserProfile.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user",
        });
    };

    return UserProfile;
};