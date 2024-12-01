const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');

// Define the ai command
cmd({
    pattern: "bible",
    desc: "AI chat",
    category: "ai",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Fetch response from AI API
        let data = await fetchJson(`https://api.vihangayt.com/ai/bible?q=${q}`);
        let response = data.data;

                // Format the reply
        let replyText = `
*THENU 𝗠𝗗 BIBLE  𝗥𝗘𝗣𝗟𝗬*

🔍 *𝗤𝘂𝗲𝗿𝘆*: _${q}_

💬 *𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲*: _${text}_

🌟 *REF*: _${ref}_

THENUX MD BIBLE INFORMATION`;

        // Send the reply with the thumbnail image
        await conn.sendMessage(from, { image: { url: 'https://i.ibb.co/QXW2jmR/NEW-BETA.png' }, caption: replyText }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});
