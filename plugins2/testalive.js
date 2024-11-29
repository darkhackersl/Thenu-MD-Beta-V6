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

> 3 💥_SYSTEM_⤵💥


┃┗━━━━━━━━━━━━┛
┗━━━━━━━━━━━━━━┛



🐼 Have A Nice Day 🐼

> ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ʙʏ THENU ᴍᴅ\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ • THENUX-AI`;

conn.ev.on('messages.upsert', async (msgUpdate) => {
    const msg = msgUpdate.messages[0];
    if (!msg.message || !msg.message.extendedTextMessage) return;
    const selectedOption = msg.message.extendedTextMessage.text.trim();
    
    if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === sentMsg.key.id) {
        switch (selectedOption) {
            case '1':
                responseText = `.menu`;
            
                const messageConten = {
                    text: responseText,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '1203633129628631506@newsletter',
                            newsletterName: "THENU-MD-V6",
                            serverMessageId: 143
                        }
                    }
                };
            
                await conn.sendMessage(from, messageConten, { quoted: mek });
                break;
              
            case '2':
                responseText = `.ping`;
            
                const messageContent = {
                    text: responseText,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '1203633129628631506@newsletter',
                            newsletterName: "THENU-MD-V6",
                            serverMessageId: 143
                        }
                    }
                };
            
                await conn.sendMessage(from, messageContent, { quoted: mek });
                break;
            
                
              
                case '3':
                    responseText = `.system`;
            
                const messageContent2 = {
                    text: responseText,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363318466798359@newsletter',
                            newsletterName: "THENU-MD-V6",
                            serverMessageId: 143
                        }
                    }
                };
            
                await conn.sendMessage(from, messageContent2, { quoted: mek });
                break;
            default:
                reply("Invalid option. Please select a valid menu option (1-3).");
        }
         
        setTimeout(async () => {
            await conn.sendMessage(from, { delete: msg.key });
        }, 90000); // 10 seconds timeout for deletion
}
});

const sentMsg = await conn.sendMessage(from, {
    document: { url: "https://i.ibb.co/QXW2jmR/NEW-BETA.png" },
    mimetype: 'application/pdf',
    fileName: 'Thenu-MD-Beta.pdf',
    caption: messageText,
    footer: '> ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ʙʏ Thenu ᴍᴅ\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ • Theux-AI',
    contextInfo: {
        mentionedJid: ['94767096711@s.whatsapp.net'], // Mentioned JID
        externalAdReply: {
            title: 'Thenu-MD',
            body: 'Thenux-AI',
            mediaType: 1, // Media type for external ad
            thumbnail: { url: 'https://i.ibb.co/HDCFS9F/Thenu-MD-new-card-ofc.png' },
            renderLargerThumbnail: true,
            sourceUrl: "https://github.com/darkhackersl"
        },
    
    
    
    

    }
})

      
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
        }

    } catch (e) {
        reply('*Error !!*');
        console.log(e);
    }
});