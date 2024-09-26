const { Setting } = require("../models");

class SettingsController {
    async upsertSetting(req, res) {
        const { key, value, category, description } = req.body;
        try {
            const [setting, created] = await Setting.upsert({
                key,
                value,
                category,
                description,
            });
            return res.status(200).json(setting);
        } catch (error) {
            console.error("Error upserting setting:", error);
            res.status(500).json(error);
        }
    }

    async getSetting(req, res) {
        const { key } = req.query; // Extract key from query parameters
        try {
            const setting = await Setting.findOne({ where: { key } });
            const value = setting ? setting.value : null;
            res.status(200).json({ key, value });
        } catch (error) {
            console.error("Error getting setting:", error);
            res.status(500).json(error);
        }
    }

    async deleteSetting(req, res) {
        const { key } = req.body;
        try {
            await Setting.destroy({ where: { key } });
            res.status(203).send();
        } catch (error) {
            console.error("Error deleting setting:", error);
            res.status(500).json(error);
        }
    }
}

module.exports = new SettingsController();