const { cmd } = require('../command');
const xnxx = require("xnxx-dl");
const { checkAccess, blacklistedJIDs } = require("../lib/accessControl");

cmd({
    pattern: "xnxx",
    desc: "Downloads a video from XNXX",
    use: ".xnxx <search_term>",
    react: "🤤",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        if (!checkAccess(senderNumber, isGroup)) {
            if (blacklistedJIDs.includes(senderNumber)) {
                return reply("🚫 You are blacklisted. Access denied.");
            }
            return reply(
                "😢 Access denied. You don't have permission to use this command. Please buy PREMIUM Version!\n\n> Contact Owner\n_94767096711_\n\n`💸Premium version price` FREE"
            );
        }

        const searchTerm = q.trim();
        if (!searchTerm) return reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝖲𝖾𝖺𝗋𝖼𝗁 𝖳𝖾𝗋𝗆");

        reply("𝖲𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝖥𝗈𝗋 𝖸𝗈𝗎𝗋 𝖵𝗂𝖽𝖾𝗈 𝗂𝗇 𝖲𝖺𝗁𝖺𝗌-𝖬𝖣 𝖶𝖠 𝖡𝖮𝖳 ➤...");
        
        try {
            const videoInfo = await xnxx.download(searchTerm);
            if (!videoInfo || !videoInfo.link_dl) {
                return conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
            }

            reply("𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝗂𝗇𝗀 𝖵𝗂𝖽𝖾𝗈 𝖯𝗅𝖾𝖺𝗌𝖾 𝖶𝖺𝗂𝗍 ➤...");
            const videoUrl = videoInfo.link_dl;

            await conn.sendMessage(
                from,
                { video: { url: videoUrl }, caption: '> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ Thenux-AI', mimetype: 'video/mp4' },
                { quoted: mek }
            );

            await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        } catch (error) {
            console.error(error);
           // reply(*Error:* ${error.message});
        }
    } catch (error) {
        console.error(error);
       // reply(*Unexpected Error:* ${error.message});
    }
});