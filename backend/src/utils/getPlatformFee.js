const { Setting } = require("../models");

const getPlatformFee = async () => {
    const setting = await Setting.findOne({ where: { key: 'platform_fee' } });
    return setting ? setting.value + '00' : null;
};

module.exports = getPlatformFee;