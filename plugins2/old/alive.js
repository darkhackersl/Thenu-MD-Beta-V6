const { cmd, commands } = require('../command');
const {readEnv} = require('../lib/database')
const config = require('../config');
const os = require('os');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, fetchJson, runtime, sleep } = require('../lib/functions');

//-----------------------------------------------ALive-----------------------------------------------
cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    category: "general",
    react: "👾",
    filename: __filename
},
async (conn, mek, m, {from, prefix, pushname, reply}) => {
    try {
        const config = await readEnv(); 
        // Determine the host platform
        let hostname;
        if (os.hostname().length == 12) hostname = 'replit';
        else if (os.hostname().length == 36) hostname = 'heroku';
        else if (os.hostname().length == 8) hostname = 'koyeb';
        else hostname = os.hostname();

        // Create the text response with system details
        const sssf = `👋 Hello ${pushname}, I'm alive now

👾 I'm Thenu md Whatsapp Bot

Hi I am multi device whatsapp bot`;
      
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
                header: '',
                footer: 'Powered By Thenu and Nethu',
                body: sssf
            };
            return await conn.sendButtonMessage(from, buttons, m, opts);
        } else {
            await conn.sendMessage(from, {
                image: { url: "https://pomf2.lain.la/f/147pvvp2.jpg" },
                footer: 'Powered By Thenu and Nethu',
                caption: sssf
            }, { quoted: mek });
        }

    } catch (e) {
        reply('*Error !!*');
        console.log(e);
    }
});
