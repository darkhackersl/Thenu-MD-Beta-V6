const config = require('../config')
const { cmd, commands } = require('../command');
const {readEnv} = require('../lib/database')
const pdfUrl = "https://pomf2.lain.la/f/147pvvp2.jpg";
const os = require('os');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, fetchJson, runtime, sleep } = require('../lib/functions');


cmd({
    pattern: "menu2",
    react: "🗃️",
    alias: ["panel", "list", "commands"],
    desc: "Get bot\'s command list.",
    category: "other",
    use: '.menu',
    filename: __filename
},
async (conn, mek, m, {
    from,
    pushname,
    reply
}) => {
    try {
        if (os.hostname().length == 12) hostname = 'replit'
        else if (os.hostname().length == 36) hostname = 'heroku'
        else if (os.hostname().length == 8) hostname = 'koyeb'
        else hostname = os.hostname()
        let monspace = '```'
        const MNG = `${monspace}👋 Hello ${pushname}${monspace}

👾 Thenu-MD-Beta commands menu...

> Version: ${require("../package.json").version}
> Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
> Runtime: ${runtime(process.uptime())}
> Platform: ${hostname}`;

if (config.BUTTON === "true") {
    let buttons = [
        {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
                display_text: 'Follow Our WhatsApp Channel',
                url: 'https://whatsapp.com/channel/0029VagCogPGufJ3kZWjsW3A',
                merchant_url: 'https://whatsapp.com/channel/0029VagCogPGufJ3kZWjsW3A'
            }),
        },
        {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
                display_text: "Get Menu",
                id: ".menu"
            }),
        },
        {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
                display_text: "PING",
                id: ".ping"
            }),
        }
    ];

    let opts = {
        image: 'https://pomf2.lain.la/f/147pvvp2.jpg',
        header: 'MNG',
        footer: 'Powered By Thenu and Nethu',
        body: MNG
    };
    return await conn.sendButtonMessage(from, buttons, m, opts);
} else {
    await conn.sendMessage(from, {
        image: { url: "https://pomf2.lain.la/f/147pvvp2.jpg" },
        footer: 'Powered By Thenu and Nethu',
        caption: MNG
    }, { quoted: mek });
}

} catch (e) {
reply('*Error !!*');
console.log(e);
}
});
 

