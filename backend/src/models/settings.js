const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Adjust the path to your configuration

module.exports = (sequelize) => {
    const Setting = sequelize.define('Setting', {
        key: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,  // Each setting key must be unique
        },
        value: {
            type: DataTypes.TEXT,
            allowNull: false,  // Value of the setting, stored as a string
            defaultValue: "",
            get() {
                const rawValue = this.getDataValue('value');
                try {
                    return JSON.parse(rawValue);  // Parse JSON if it's JSON format
                } catch (e) {
                    return rawValue;  // Return as string if not JSON
                }
            },
            set(value) {
                if (typeof value === 'object') {
                    this.setDataValue('value', JSON.stringify(value));  // Store JSON as a string
                } else {
                    this.setDataValue('value', value);
                }
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,  // Grouping settings by category (e.g., "Security", "Platform", etc.)
        },
        description: {
            type: DataTypes.STRING,  // Optional description for admin UI
            allowNull: true,
        },
    }, {
        timestamps: true,
    });
    return Setting;

}
