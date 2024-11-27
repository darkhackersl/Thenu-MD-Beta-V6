const dyluxApi = require("api-dylux");
const cheerio = require("cheerio");
const axios = require("axios");
const {
    checkAccess,
    isPremiumUser,
    blacklistedJIDs,
    premiumJIDs,
    dataLoaded,
} = require("../lib/accessControl");
const { fetchJson } = require('../lib/functions')
const config = require('../config')
const { cmd, commands } = require('../command')

//==============   FACEBOOK DL   ==============//

const baseUrl = "https://prabath-md-api.up.railway.app";

async function socialMediaDownload(url) {
    let endpoint;
    if (url.includes("facebook.com") || url.includes("fb.watch")) {
        endpoint = `${baseUrl}/api/fdown?url=${encodeURIComponent(url)}`;
        } else if (url.includes("mediafire.com")) {
            endpoint = `${baseUrl}/api/mediafiredl?url=${encodeURIComponent(url)}`;
        } else if (url.includes("twitter.com")) {
            endpoint = `${baseUrl}/api/twitter/dl?url=${encodeURIComponent(url)}`;
        } else {
        throw new Error("𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖴𝗋𝗅` ❗");
    }
    const response = await axios.get(endpoint);
    return response.data;
}

cmd(
    {
        pattern: "fb",
        alias: ["facebook"],
        react: "🔎",
        desc: "Download Facebook videos",
        category: "download",
        use: ".fb <facebook link>",
        filename: __filename,
    },
    async (
        conn,
        mek,
        m,
        { from, quoted, args, q, isGroup, sender, pushname, reply },
    ) => {
        try {
            const senderNumber = m.sender;
            const isGroup = m.isGroup || false;

            // Check access permissions
            if (!checkAccess(senderNumber, isGroup)) {
                if (blacklistedJIDs.includes(senderNumber)) {
                    return reply("*🚫 You are blacklisted. Access denied.*");
                } else {
                    return reply(
                        "*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode!*",
                    );
                }
            }

            if (!q)
                return await reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖴𝗋𝗅` ❗");


            const response = await socialMediaDownload(q);

if (response.status === "success ✅" && response.data) {
    const { hd, sd, audio } = response.data;

    if (hd || sd) {

        // Prompt user to select HD or SD
        const videoMessage = `*乂 THENU-MD FB DOWNLOADER*

🎬 𝖳𝖺𝗍𝗂𝗅𝖾 : Undifended
🖇️ 𝖡𝖺𝗌𝖾 𝖴𝗋𝗅 : www.facebook.com


*乂 REPLY THE DOWNLOAD OPTION*

1️⃣  𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽 : 𝖵𝗂𝖽𝖾𝗈 𝖧𝖣 𝖳𝗒𝗉𝖾.
2️⃣  𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽 : 𝖵𝗂𝖽𝖾𝗈 𝖲𝖣 𝖳𝗒𝗉𝖾.
‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ THENUX-AI*`;



        const sentMessage = await conn.sendMessage(
            from,
            {
                text: videoMessage,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterName: "👾   Thenux  |   AI ジ",
                        newsletterJid: "1203632966023464049@newsletter",
                    },
                        externalAdReply: {
                              title: `Thenu-MD FB Downloader`,
                              body: `Undifended : Powerd By Thenu-MD FB Information Search Engine`,
                              thumbnailUrl: `https://pomf2.lain.la/f/9ggi67rj.jpg`,
                              sourceUrl:  ``,
                              mediaType: 1,
                              renderLargerThumbnail: true
                    },
                },
            },
            { quoted: mek },
        );

        conn.ev.on("messages.upsert", async (messageUpsert) => {
            const msg = messageUpsert.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage)
                return;

            const userReply =
                msg.message.extendedTextMessage.text.trim();
            const messageContext =
                msg.message.extendedTextMessage.contextInfo;

            if (
                messageContext &&
                messageContext.stanzaId === sentMessage.key.id
            ) {
                // Send the selected video quality
                if (userReply === "1" && hd) {
                    await conn.sendMessage( 
                        from,
                        {

                            video: { url: hd },
                            caption: `‎ ‎𝖥 𝖡  𝖧 𝖣  𝖵 𝖨 𝖣 𝖤 𝖮  ( 7 2 0 𝗉 )
‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ꜱᴀʜᴀꜱ ᴛᴇᴄʜ*`,

                        },
                        { quoted: mek },
                    );
                } else if (userReply === "2" && sd) {
                    await conn.sendMessage(
                        from,
                        {
                            video: { url: sd },
                            caption: `‎ ‎𝖥 𝖡  𝖲 𝖣  𝖵 𝖨 𝖣 𝖤 𝖮  ( 4 8 0 𝗉 )
‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ Thenux ᴛᴇᴄʜ*`,
                        },
                        { quoted: mek },





                    );
                } else {
                    reply(
                        "𝖯𝗅𝖾𝖺𝗌𝖾 𝖤𝗇𝗍𝖾𝗋 𝖵𝖺𝗅𝗂𝖽 𝖮𝗉𝗍𝗂𝗈𝗇 `1 𝖮𝗋 2` ❗",
                    );
                }
            }
        });
    } else {
        reply("No Video URL Found in the Response.");


    }
} else {
    reply("Failed to Fetch Video Data.");
    }



}catch(e) {
console.error("Detailed Error:", e);
reply(
    "𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖴𝗋𝗅` ❗",
);
}
},
);

//==============   TIK TOK DL   ==============//

cmd({
    pattern: "tt",
    alias: ["tiktok"],
    react: '🎵',
    desc: "Download TikTok videos",
    category: "download",
    use: '.tt <tiktok link>',
    filename: __filename
}, async (conn, mek, m, { from, args, reply, pushname }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check access permissions
        if (!checkAccess(senderNumber, isGroup)) {
            if (blacklistedJIDs.includes(senderNumber)) {
                return reply("*🚫 You are blacklisted. Access denied.*");
            } else {
                return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode!*");
            }
        }

        // Get the TikTok URL from args
        const q = args.join(" ");
        if (!q) return await reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖳𝗂𝗄𝗍𝗈𝗄 𝖴𝗋𝗅` ❗");

        // Watermark message
        let wm = `*乂 THENU-MD TIK TOK DOWNLOADER*

🎬 𝖳𝖺𝗍𝗂𝗅𝖾 : Undifended
🖇️ 𝖡𝖺𝗌𝖾 𝖴𝗋𝗅 : www.tiktok.com


*乂 REPLY THE DOWNLOAD OPTION*

1️⃣  𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽 : 𝖵𝗂𝖽𝖾𝗈 𝖧𝖣 𝖳𝗒𝗉𝖾. ( 𝖶𝗂𝗍𝗁𝗈𝗎𝗍 𝖶𝖺𝗍𝖾𝗋𝗆𝖺𝗋𝗄 )
2️⃣  𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽 : 𝖠𝗎𝖽𝗂𝗈 𝖳𝗒𝗉𝖾.
‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ 
> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ Thenux ᴛᴇᴄʜ*`;

        const sentMessage = await conn.sendMessage(
            from,
            {
                text: wm,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterName: "👾  Thenux  |   AI  ジ",
                        newsletterJid: "1203632126605464049@newsletter",
                    },
                        externalAdReply: {
                              title: `SAHAS-MD Tik Tok Downloader`,
                              body: `Undifended : Powerd By SAHAS-MD Tiktok Information Search Engine`,
                              thumbnailUrl: `https://pomf2.lain.la/f/eo16q3mu.png`,
                              sourceUrl:  ``,
                              mediaType: 1,
                              renderLargerThumbnail: true
                    },
                    },
                        },
                        { quoted: mek },
                    );




        // Perform TikTok download using a hypothetical tiktokdl function
        let response = await tiktokdl(q);
        let { video, music } = response;

        // Send initial message with options



        // Listen for user's reply
        conn.ev.on("messages.upsert", async (messageUpsert) => {
            const msg = messageUpsert.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const userReply = msg.message.extendedTextMessage.text.trim();
            const messageContext = msg.message.extendedTextMessage.contextInfo;

            // Check if the reply is to the previously sent prompt
            if (messageContext && messageContext.stanzaId === sentMessage.key.id) {
                if (userReply === '1') {
                    // Send the video
                    await conn.sendMessage(from, { 
                        video: { url: video }, 
                        caption: `‎ ‎𝖳 𝖨 𝖪 𝖳 𝖮 𝖪  𝖧 𝖣  𝖵 𝖨 𝖣 𝖤 𝖮  ( 7 2 0 𝗉  )
                            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ꜱᴀʜᴀꜱ ᴛᴇᴄʜ*`

                    }, { quoted: msg });
                } else if (userReply === '2') {
                    // Send the audio
                    await conn.sendMessage(from, { 
                        audio: { url: music }, 
                        mimetype: "audio/mpeg" 
                    }, { quoted: msg });
                } else {
                    await conn.sendMessage(from, { 
                        text: "𝖯𝗅𝖾𝖺𝗌𝖾 𝖤𝗇𝗍𝖾𝗋 𝖵𝖺𝗅𝗂𝖽 𝖮𝗉𝗍𝗂𝗈𝗇 `1 𝖮𝗋 2` ❗" 
                    }, { quoted: msg });
                }
            }
        });

        // Send a reaction

                    } catch (e) {
console.error("Error", e);
                    reply(
                        "𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖳𝗂𝗄𝗍𝗈𝗄 𝖴𝗋𝗅` ❗",

);
        }
    },
);





//==============   GDRIVE DL   ==============//

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Google Drive Downloader with size limit (e.g., 100MB limit)
const MAX_DOWNLOAD_SIZE = 500 * 1024 * 1024; // 100 MB

cmd({
    pattern: "gdrive",
    alias: ["googledrive"],
    react: '🎗️',
    desc: "Download Google Drive files",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, pushname }) => {
    if (!q || !q.startsWith("https://")) {
        return conn.sendMessage(from, { text: "𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖦𝖽𝗋𝗂𝗏𝖾 𝖴𝗋𝗅` ❗" }, { quoted: mek });
    }

    const data = await fetchJson(`${baseUrl}/api/gdrivedl?url=${encodeURIComponent(q)}`);
    const fileInfo = data.data || data;
                                                  // Send the song info with context
                                                  const downloadingMsg = await conn.sendMessage(
                                                      from,
                                                      {
                                                          text: `*乂 Thenu-MD GDRIVE DOWNLOADER*
                                                          
📁 𝖭𝖺𝗆𝖾 : ${fileInfo.fileName}
📻 𝖥𝗂𝗅𝖾 𝖲𝗂𝗓𝖾 : ${fileInfo.fileSize}
🖇️ 𝖡𝖺𝗌𝖾 𝖴𝗋𝗅 : www.gdrive.com
‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ꜱᴀʜᴀꜱ ᴛᴇᴄʜ*`,
                                                          contextInfo: {
                                                              forwardingScore: 999,
                                                              isForwarded: true,
                                                              forwardedNewsletterMessageInfo: {
                                                                  newsletterName: "👾  Thenux  |   AI ジジ",
                                                                  newsletterJid: "1203632966054698049@newsletter",
                                                              },
                                                              externalAdReply: {
                                                                  title: `SAHAS-MD Gdrive Downloader`,
                                                                  body: `${fileInfo.fileName || fileInfo.title || `Undifended`} : Powerd By SAHAS-MD Gdrive Information Search Engine`,
                                                                  thumbnailUrl: `https://pomf2.lain.la/f/41i00kdh.png`,
                                                                  sourceUrl: ``,
                                                                  mediaType: 1,
                                                                  renderLargerThumbnail: true, 
        


          },
          },
              },
              { quoted: mek },
          );
 
        
        

    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check access permissions
        if (!checkAccess(senderNumber, isGroup)) {
            if (blacklistedJIDs.includes(senderNumber)) {
                return reply("*🚫 You are blacklisted. Access denied.*");
            } else {
                return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode!*");
            }
        }

        const data = await fetchJson(`${baseUrl}/api/gdrivedl?url=${encodeURIComponent(q)}`);
        const fileInfo = data.data || data;

        // Check if file size is available and handle accordingly
        const fileSize = fileInfo.fileSize || 0; // Default to 0 if fileSize is not present
        const MAX_DOWNLOAD_SIZE = 500 * 1024 * 1024; // 500 MB

        if (fileSize > MAX_DOWNLOAD_SIZE) {
            await conn.sendMessage(from, { text: `⚠️ The file size is too large. Maximum allowed size is 500 MB. The provided file is ${formatFileSize(fileSize)}.` }, { quoted: mek });
            return await conn.sendMessage(from, { react: { text: "⚠️", key: mek.key } });
        }

        const caption = `> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ Thenux ᴛᴇᴄʜ*`;
        await conn.sendMessage(from, { 
            document: { url: fileInfo.download || fileInfo.link || fileInfo.url }, 
            fileName: fileInfo.fileName || fileInfo.title, 
            mimetype: fileInfo.mimeType || fileInfo.file_type,
            caption: caption
        }, { quoted: mek });

    



        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
                                    
    } catch (error) {
        console.error('❌ Error in Google Drive downloader:', error);
        const errorMessage = error.response && error.response.status === 404 
            ? '❌ Error: The requested file could not be found. Please check the URL and try again.'
            : `❌ An error occurred: ${error.message}`;


await conn.sendMessage(from, { text: errorMessage }, { quoted: mek });
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });

 }
});












        





cmd({
    pattern: "apkdl",
    desc: "Fetch APK details and send APK file.",
    category: "download",
    react: "🔎",
    filename: __filename
},
async (conn, mek, m, { from, reply, q, pushname }) => {
    try {
                const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check access permissions
        if (!checkAccess(senderNumber, isGroup)) {
            if (blacklistedJIDs.includes(senderNumber)) {
                return reply("*🚫 You are blacklisted. Access denied.*");
            } else {
                return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode!*");
            }
        }

        if (!q) {
            return reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖠𝗉𝗉𝗅𝗂𝖼𝖺𝗍𝗂𝗈𝗇 𝖭𝖺𝗆𝖾` ❗");
        }

        const apkurl = `https://prabath-md-api.up.railway.app/api/apkdl?q=${q}&apikey=${sai}`;
        const response = await axios.get(apkurl);
        const data = response.data;

        if (!data || !data.data) {
            return reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖠𝗉𝗉𝗅𝗂𝖼𝖺𝗍𝗂𝗈𝗇 𝖭𝖺𝗆𝖾` ❗");
        }

        const apkData = data.data;
        const apkIcon = apkData.icon;
        const apkName = apkData.name;
        const apkPackage = apkData.package;
        const apkLastUpdate = apkData.lastup;
        const apkSize = apkData.size;
        const apkDownloadLink = apkData.dllink;

        await conn.sendMessage(from, {
            image: { url: apkIcon },





                text: `*乂 THENU-MD APK DOWNLOADER*

📁 𝖭𝖺𝗆𝖾 : ${apkName}
📻 𝖥𝗂𝗅𝖾 𝖲𝗂𝗓𝖾 : ${apkSize} MB
📆 𝖫𝖺𝗌𝗍 𝖴𝗉𝖽𝖺𝗍𝖾 : ${apkLastUpdate}
🖇️ 𝖡𝖺𝗌𝖾 𝖴𝗋𝗅 : www.playstore.com
‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ꜱᴀʜᴀꜱ ᴛᴇᴄʜ*`,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterName: "👾 Thenux  |   AI ジ",
                        newsletterJid: "120363296605464049@newsletter",
                    },
                    externalAdReply: {
                        title: `SAHAS-MD Application Downloader`,
                        body: `${apkName} : Powerd By SAHAS-MD Apk Information Search Engine`,
                        thumbnailUrl: apkData.icon,
                        sourceUrl: ``,
                        mediaType: 1,
                        renderLargerThumbnail: true,

        },
                },
            },
            { quoted: mek },
        );







        const filePath = path.join(__dirname, `${apkPackage}.apk`);

        const apkResponse = await axios({
            url: apkDownloadLink,
            method: 'GET',
            responseType: 'stream'
        });

        const writer = fs.createWriteStream(filePath);

        apkResponse.data.pipe(writer);

        writer.on('error', (err) => {
            console.error(`File write error: ${err.message}`);
            reply(`Error: ${err.message}`);
        });

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        await conn.sendMessage(from, {
            document: { url: filePath },
            mimetype: 'application/vnd.android.package-archive',
            fileName: `${apkName}.apk`,
            caption: `Thenu • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛`,
            footer: 'Thenu • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛'
        }, { quoted: mek });

        fs.unlinkSync(filePath);

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});


//twitter dl (x)
cmd({
    pattern: "twitter",
    alias: ["twdl"],
    desc: "download tw videos",
    category: "download",
    react: "🔎",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖳𝗐𝗂𝗍𝗍𝖾𝗋 𝖴𝗋𝗅")
        //fetch data from api  
        let data = await fetchJson(`${baseUrl}/api/twitterdl?url=${q}`)
        reply("*𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝗂𝗇𝗀...*")
        //send video (hd,sd)
        await conn.sendMessage(from, { video: { url: data.data.data.HD }, mimetype: "video/mp4", caption: `- HD \n\n > *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ THENUX ᴛᴇᴄʜ*` }, { quoted: mek })
        await conn.sendMessage(from, { video: { url: data.data.data.SD }, mimetype: "video/mp4", caption: `- SD \n\n > *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ THENUX ᴛᴇᴄʜ*` }, { quoted: mek })  
        //send audio    
        await conn.sendMessage(from, { audio: { url: data.data.data.audio }, mimetype: "audio/mpeg" }, { quoted: mek })  
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})






