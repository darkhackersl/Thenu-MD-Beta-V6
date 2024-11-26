const config = require('../config')
const { cmd, commands } = require('../command');
const {readEnv} = require('../lib/database')
const os = require('os');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, fetchJson, runtime, sleep } = require('../lib/functions');


cmd({
    pattern: "testalive",
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



     
// Send the message with a document

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
                    thumbnail: { url: 'https://github.com/darkhackersl/Thenu-MD-DATABASE/blob/e2a4c3cc0e4686dfed644eed172cca7d8094b8c6/Thenu%20-%20MD%20new%20card%20ofc.png' },
                    renderLargerThumbnail: true,
                    sourceUrl: "https://github.com/darkhackersl"
                }
            
            
            

            },
                    image: { url: 'https://github.com/darkhackersl/Thenu-MD-DATABASE/blob/e2a4c3cc0e4686dfed644eed172cca7d8094b8c6/Thenu%20-%20MD%20new%20card%20ofc.png' },
                caption: messageText
            }, { quoted: mek || null });
        
   
   

 
    
    


    } catch (e) {
        // Send error message to the user if something goes wrong
        reply('Error occurred while sending the alive message!');
        console.error(e);
    }
});