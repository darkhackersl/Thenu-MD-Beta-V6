const config = require('../config')
const { cmd, commands } = require('../command');
const {readEnv} = require('../lib/database')
const os = require('os');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, fetchJson, runtime, sleep } = require('../lib/functions');


cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    category: "general",
    react: "🍬",
    filename: __filename
},
async (conn, mek, m, { from, prefix, pushname, reply }) => {
    try {
        // Create the text response with system details
        const monspace = '`';
        const messageText = `${monspace}👋 Hello ${pushname}, I'm alive now${monspace}

👾 I'm Thenu 𝘔𝘋 Whatsapp Bot

*Reply to this message, type the number in the relevant menu and send ⤵️*

┏━━━━━━━━━━━━━━┓
┃╭┈───────────╮

> 1 💥_𝐌𝐄𝐍𝐔_⤵💥

> 2 💥_PING_⤵💥


┃┗━━━━━━━━━━━━┛
┗━━━━━━━━━━━━━━┛



🐼 Have A Nice Day 🐼

> ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ʙʏ ThEnU ᴍᴅ\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ • THENUX-AI`;

conn.ev.on('messages.upsert', async (msgUpdate) => {
    const msg = msgUpdate.messages[0];
    if (!msg.message || !msg.message.extendedTextMessage) return;
    const selectedOption = msg.message.extendedTextMessage.text.trim();
    
    if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === sentMsg.key.id) {
        switch (selectedOption) {
            case '1':
                reply(`.menu`);
                break;
            case '2':
                reply(`.ping`);
                break;
            default:
                reply("Invalid option. Please select a valid menu option (1-4).");
        }
         
        setTimeout(async () => {
            await conn.sendMessage(from, { delete: msg.key });
        }, 90000); // 10 seconds timeout for deletion
}
});



     
if (config.BUTTON === "false") {}
const sentMsg = await conn.sendMessage(from, {
    document: { url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    mimetype: 'application/pdf',
    fileName: 'Thenu-MD-Beta.pdf',
    caption: messageText,
    footer: '> ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ʙʏ Thenu ᴍᴅ\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ • Theux-AI',
    contextInfo: {
        mentionedJid: ['94757096717@s.whatsapp.net'], // Mentioned JID
        externalAdReply: {
            title: 'Thenu-MD',
            body: 'Thenux-AI',
            mediaType: 1, // Media type for external ad
            thumbnail: { url: 'https://i.ibb.co/HDCFS9F/Thenu-MD-new-card-ofc.png' },
            renderLargerThumbnail: true,
            sourceUrl: "https://github.com/darkhackersl"
        },
    
    
    
    

    },
            image: { url: 'https://i.ibb.co/HDCFS9F/Thenu-MD-new-card-ofc.png' },
        caption: messageText
    }, { quoted: mek || null });


      
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
                image: 'https://i.ibb.co/HDCFS9F/Thenu-MD-new-card-ofc.png',
                header: 'messageText',
                footer: 'Powered By Thenu and Nethu',
                body: messageText
            };
            return await conn.sendButtonMessage(from, buttons, m, opts);
        } else {
            await conn.sendMessage(from, {
                image: { url: "https://i.ibb.co/HDCFS9F/Thenu-MD-new-card-ofc.png" },
                footer: 'Powered By Thenu and Nethu',
                caption: messageText
            }, { quoted: mek });
        }

    } catch (e) {
        reply('*Error !!*');
        console.log(e);
    }
});