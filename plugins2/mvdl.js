const { fetchJson } = require('../lib/functions')
const config = require('../config')
const {
    checkAccess,
    isPremiumUser,
    blacklistedJIDs,
    premiumJIDs,
    dataLoaded,
} = require("../lib/accessControl");
const { cmd, commands } = require('../command')

// FETCH API URL
let baseUrl;
(async () => {
    let baseUrlGet = await fetchJson(`https://raw.githubusercontent.com/prabathLK/PUBLIC-URL-HOST-DB/main/public/url.json`)
    baseUrl = baseUrlGet.api
})();


const yourName = "❗මෙය වෙබ් පිටපතක් වන අතර,සිංහල උපසිරැසි වෙනම එකතු කරගැනීමට *සිංහල උපසිරැසි* Button එක click කරන්න.\n\n> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ꜱᴀʜᴀꜱ ᴛᴇᴄʜ*\n\n 🎬*ꜱᴀʜᴀꜱ ᴍᴅ ᴄɪɴᴇʀᴜ.ʟᴋ ᴍᴏᴠɪᴇ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*🎬​";


cmd({
    pattern: "gdmovie",
    alias: ["googledrivemovie","gdrivemovie"],
    desc: "download cinerulk movie ",
    category: "movie",
    react: "🎬",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
        try {
            const senderNumber = m.sender;
            const isGroup = m.isGroup || false;
        // Check access permissions
        if (!checkAccess(senderNumber, isGroup)) {
            if (blacklistedJIDs.includes(senderNumber)) {
                return reply("*🚫 You are blacklisted. Access denied.*");
            } else {
                return reply(
                    "*😢 Access denied*. You don't have permission to use this command.Please buy *0PREMIUM* Version !.\n\n> Contact Owner\n_94767096711_\n\n`💸Premium version price` *FREE*",
                );
            }
        }

        if (!q && !q.startsWith("https://")) return reply("මට මෙය හදුනාගැනීමට අපහසුයි🤔.\nඑකෙන් ලබා ගන්නා,Google drive ලින්ක් පමණක් භාවිතා කරන්න ")
        //fetch data from api  
        let data = await fetchJson(`${baseUrl}/api/gdrivedl?url=${q}`)
        reply("🎬 *THENU ᴍᴅ ᴄɪɴᴇʀᴜ.ʟᴋ ᴍᴏᴠɪᴇ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ* 🎬​ \n*--------------------------------------------*\n𝕐𝕆𝕌ℝ 𝕄𝕆𝕍𝕀𝔼 𝕀𝕊\n*📤𝕌ℙ𝕃𝕆𝔸𝔻𝕀ℕ𝔾 ◽◽◽◽◽◽*\n\n> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ Thenux ᴛᴇᴄʜ*")
        await conn.sendMessage(from, { document: { url: data.data.download }, fileName: data.data.fileName, mimetype: data.data.mimeType, caption: `🍟Movie Name : ${data.data.fileName} | සිංහල උපසිරැසි ඇතුළත් කර නැත.\n🍫Bot Owner : 94767096711 \n\n${yourName}` }, { quoted: mek })                                                                                                                 
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})