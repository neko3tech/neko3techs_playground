const bcrypt = require("bcrypt");

module.exports = (salt = parseInt(process.env.APP_HASH_SALT) || 10) => {
    return {
        benc: (plainStr) => {
            return bcrypt.hashSync(plainStr, salt);
        },
        bcomp: (plainStr, encStr) => {
            return bcrypt.compareSync(plainStr, encStr);
        },
    }
};