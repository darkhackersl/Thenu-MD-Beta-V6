const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "GBY3jSyK#PdRPkJKteO4lzxBI3PrLBNXsn7Yb2GG-AABeMzkKFb4",
MONGODB: process.env.MONGODB || "mongodb://mongo:fOjhhJLgKpqmJrGROtvhmGSrHHBUUryB@autorack.proxy.rlwy.net:14912",
PREFIX: process.env.PREFIX || ".",
BOT_NAME: process.env.BOT_NAME || "Thenu-MD",
BOT_NUMBER: process.env.BOT_NUMBER || "94767096711",
AUTO_AI: process.env.AUTO_AI || "false",
LANG: process.env.LANG || "SI",
ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
AUTO_READ_CMD: process.env.AUTO_READ_CMD || "true",
ALWAYS_TYPING: process.env.ALWAYS_TYPING || "true",
ANTI_DELETE: process.env.ANTI_DELETE || "true",
ALWAYS_RECORDING: process.env.ALWAYS_RECORDING || "true",
FOOTER: process.env.FOOTER || "Thenux",
AUTO_REACT: process.env.AUTO_REACT || "true"
};
