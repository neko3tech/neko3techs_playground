const bcrypt = require("bcrypt");
const createHash = require("crypto").createHash;

const digestType = {
    hex: "hex",
    base64: "base64",
    buffer: "",
};

module.exports = (salt = parseInt(process.env.APP_HASH_SALT) || 10) => {
    return {
        benc: (plainStr) => {
            return bcrypt.hashSync(plainStr, salt);
        },
        bcomp: (plainStr, encStr) => {
            return bcrypt.compareSync(plainStr, encStr);
        },
        digestType: digestType,
        md5: (plainStr, digest = digestType.hex) => {
            return createHash("md5").update(plainStr).digest(digest);
        },
        sha1: (plainStr, digest = digestType.hex) => {
            return createHash("sha1").update(plainStr).digest(digest);
        },
        sha256: (plainStr, digest = digestType.hex) => {
            return createHash("sha256").update(plainStr).digest(digest);
        },
        sha512: (plainStr, digest = digestType.hex) => {
            return createHash("sha512").update(plainStr).digest(digest);
        },
    }
};