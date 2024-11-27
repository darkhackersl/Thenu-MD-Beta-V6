
//==============   SONG DL   ==============//

const { cmd, commands } = require("../command");
const fg = require("api-dylux");
const yts = require("yt-search");
const pdfUrl = "https://i.ibb.co/2PLgSdj/Picsart-24-09-16-17-49-35-655.jpg";

// Function to extract the video ID from youtu.be or YouTube links
function extractYouTubeId(url) {
    const regex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Function to convert any YouTube URL to a full YouTube watch URL
function convertYouTubeLink(q) {
    const videoId = extractYouTubeId(q);
    if (videoId) {
        return "https://www.youtube.com/watch?v=${videoId}";
    }
    return q;
}

cmd(
    {
        pattern: "song",
        desc: "To download songs.",
        react: "🎧",
        category: "download",
        filename: __filename,
    },
    async (
        conn,
        mek,
        m,
        {
            from,
            quoted,
            body,
            isCmd,
            command,
            args,
            q,
            isGroup,
            sender,
            senderNumber,
            botNumber2,
            botNumber,
            pushname,
            isMe,
            isOwner,
            groupMetadata,
            groupName,
            participants,
            groupAdmins,
            isBotAdmins,
            isAdmins,
            reply,
        },
    ) => {
        try {
            if (!q)
                return reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖲𝗈𝗇𝗀 𝖳𝖺𝗍𝗂𝗅𝖾 𝖮𝗋 𝖴𝗋𝗅` ❗");

            q = q;
            const search = await yts(q);
            const data = search.videos[0];
            const url = data.url;

            let desc = `*乂 THENU-MD SONG DOWNLOADER*

*⚙️ 𝖳𝗂𝗍𝗅𝖾* : ${data.title}
*📃 𝖣𝖾𝗌𝖼𝗋𝗂𝗉𝗍𝗂𝗈𝗇* : ${data.description}
*🚀 𝖵𝗂𝖾𝗐𝗌* : ${data.views}
*⏰ 𝖣𝗎𝗋𝖺𝗍𝗂𝗈𝗇* : ${data.timestamp}
*📆 𝖴𝗉𝗅𝗈𝖺𝖽𝖾𝖽 𝖮𝗇* : ${data.ago}
*🎬 𝖢𝗁𝖺𝗇𝗇𝖾𝗅* : ${data.author.name}

*乂 REPLY THE DOWNLOAD OPTION* 
┌───────────────────────────────────

*1️⃣  𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽 : 𝖠𝗎𝖽𝗂𝗈 𝖳𝗒𝗉𝖾*
*2️⃣  𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽 : 𝖣𝗈𝖼𝗎𝗆𝖾𝗇𝗍 𝖳𝗒𝗉𝖾*

└───────────────────────────────────
‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ Thenux AI*`;

            // Send the song info with context
            const sentMsg = await conn.sendMessage(
                from,
                {
                    text: desc,
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterName: "👾 THENUX  |   AI ジ",
                            newsletterJid: "120363296621464049@newsletter",
                        },
                        externalAdReply: {
                            title: `Thenu-MD Song Downloader`,
                            body: `${data.title} : Powerd By SAHAS-MD Song Information Search Engine`,
                            thumbnailUrl: data.thumbnail,
                            sourceUrl: ``,
                            mediaType: 1,
                            renderLargerThumbnail: true,
                        },
                    },
                },
                { quoted: mek },
            );

            const messageID = sentMsg.key.id; // Save the message ID for later reference

            // Listen for the user's response
            conn.ev.on("messages.upsert", async (messageUpdate) => {
                const mek = messageUpdate.messages[0];
                if (!mek.message) return;
                const messageType =
                    mek.message.conversation ||
                    mek.message.extendedTextMessage?.text;
                const from = mek.key.remoteJid;
                const sender = mek.key.participant || mek.key.remoteJid;

                // Check if the message is a reply to the previously sent message
                const isReplyToSentMsg =
                    mek.message.extendedTextMessage &&
                    mek.message.extendedTextMessage.contextInfo.stanzaId ===
                        messageID;

                if (isReplyToSentMsg) {
                    // React to the user's reply (the "1" or "2" message)
                    await conn.sendMessage(from, {
                        react: { text: "", key: mek.key },
                    });

                    if (messageType === "1" || messageType === "2") {
                        const down = await fg.yta(url);
                        const downloadUrl = down.dl_url;

                        // React to the upload (sending the file)
                        await conn.sendMessage(from, {
                            react: { text: "", key: mek.key },
                        });

                        if (messageType === "1") {
                            // Handle option 1 (Audio File)
                            await conn.sendMessage(
                                from,
                                {
                                    audio: { url: downloadUrl },
                                    mimetype: "audio/mpeg",
                                    caption: `> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ Thenux-AI*`,
                                },
                                { quoted: mek },
                            );
                        } else if (messageType === "2") {
                            // Handle option 2 (Document File)
                            await conn.sendMessage(
                                from,
                                {
                                    document: { url: downloadUrl },
                                    mimetype: "audio/mpeg",
                                    fileName: `Thenu-ᴍᴅ v6.0.0 | ${data.title}.mp3`,
                                    caption: `> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ Thenux-AI*`,
                                },
                                { quoted: mek },
                            );
                        }

                      // React to the successful completion of the task
                      await conn.sendMessage(from, {
                        react: { text: "", key: mek.key },
                    });

                    console.log("Response sent successfully");
                } else {
                    // Handle invalid input (not 1 or 2)
                    await conn.sendMessage(from, {
                        react: { text: "❓", key: mek.key },
                    });
                    reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖤𝗇𝗍𝖾𝗋 `𝖵𝖺𝗅𝗂𝖽 𝖮𝗉𝗍𝗂𝗈𝗇 1 𝖮𝗋 2` ❗");
                }
            }
        });
    } catch (e) {
        console.log(e);
        reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖲𝗈𝗇𝗀 𝖳𝖺𝗍𝗂𝗅𝖾 𝖮𝗋 𝖴𝗋𝗅` ❗");
    }
},
);


//==============   VIDEO DL   ==============//

cmd(
    {
        pattern: "video",
        desc: "To download songs.",
        react: "🎬",
        category: "download",
        filename: __filename,
    },
    async (
        conn,
        mek,
        m,
        {
            from,
            quoted,
            body,
            isCmd,
            command,
            args,
            q,
            isGroup,
            sender,
            senderNumber,
            botNumber2,
            botNumber,
            pushname,
            isMe,
            isOwner,
            groupMetadata,
            groupName,
            participants,
            groupAdmins,
            isBotAdmins,
            isAdmins,
            reply,
        },
    ) => {
        try {
            if (!q)
                return reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖵𝗂𝖽𝖾𝗈 𝖳𝖺𝗍𝗂𝗅𝖾 𝖮𝗋 𝖴𝗋𝗅` ❗");

            q = q;
            const search = await yts(q);
            const data = search.videos[0];
            const url = data.url;

            let desc = `*乂 THENU-MD VIDEO DOWNLOADER*

*⚙️ 𝖳𝗂𝗍𝗅𝖾* : ${data.title}
*📃 𝖣𝖾𝗌𝖼𝗋𝗂𝗉𝗍𝗂𝗈𝗇* : ${data.description}
*🚀 𝖵𝗂𝖾𝗐𝗌* : ${data.views}
*⏰ 𝖣𝗎𝗋𝖺𝗍𝗂𝗈𝗇* : ${data.timestamp}
*📆 𝖴𝗉𝗅𝗈𝖺𝖽𝖾𝖽 𝖮𝗇* : ${data.ago}
*🎬 𝖢𝗁𝖺𝗇𝗇𝖾𝗅* : ${data.author.name}

*乂 REPLY THE DOWNLOAD OPTION*  

*1️⃣  𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽 : 𝖠𝗎𝖽𝗂𝗈 𝖳𝗒𝗉𝖾*
*2️⃣  𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽 : 𝖣𝗈𝖼𝗎𝗆𝖾𝗇𝗍 𝖳𝗒𝗉𝖾*
‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ Thenux ᴛᴇᴄʜ*`;

 // Send the song info with context
 const sentMsg = await conn.sendMessage(
    from,
    {
        text: desc,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterName: "👾 THENUX  |   AI ジ",
                newsletterJid: "120363296621464049@newsletter",
            },
            externalAdReply: {
                title: `Thenu-MD Song Downloader`,
                body: `${data.title} : Powerd By SAHAS-MD Song Information Search Engine`,
                thumbnailUrl: data.thumbnail,
                sourceUrl: ``,
                mediaType: 1,
                renderLargerThumbnail: true,
            },
        },
    },
    { quoted: mek },
            );

            const messageID = sentMsg.key.id; // Save the message ID for later reference

            // Listen for the user's response
            conn.ev.on("messages.upsert", async (messageUpdate) => {
                const mek = messageUpdate.messages[0];
                if (!mek.message) return;
                const messageType =
                    mek.message.conversation ||
                    mek.message.extendedTextMessage?.text;
                const from = mek.key.remoteJid;
                const sender = mek.key.participant || mek.key.remoteJid;

                // Check if the message is a reply to the previously sent message
                const isReplyToSentMsg =
                    mek.message.extendedTextMessage &&
                    mek.message.extendedTextMessage.contextInfo.stanzaId ===
                        messageID;

                if (isReplyToSentMsg) {
                    // React to the user's reply (the "1" or "2" message)
                    await conn.sendMessage(from, {
                        react: { text: "", key: mek.key },
                    });

                    if (messageType === "1" || messageType === "2") {
                        const down = await fg.ytv(url);
                        const downloadUrl = down.dl_url;

                        // React to the upload (sending the file)
                        await conn.sendMessage(from, {
                            react: { text: "", key: mek.key },
                        });

                        if (messageType === "1") {
                            // Handle option 1 (Audio File)
                            await conn.sendMessage(
                                from,
                                {
                                    video: { url: downloadUrl },
                                    mimetype: "video/mp4",
                                    caption: `‎ ‎𝖸 𝖳  𝖲 𝖣  𝖵 𝖨 𝖣 𝖤 𝖮  ( 4 8 0 𝗉  )
                            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ Thenux ᴛᴇᴄʜ*`,
                                },
                                { quoted: mek },
                            );
                        } else if (messageType === "2") {
                            // Handle option 2 (Document File)
                            await conn.sendMessage(
                                from,
                                {
                                    document: { url: downloadUrl },
                                    mimetype: "video/mp4",
                                    fileName: `THENU-ᴍᴅ V6.0.0 | ${data.title}.mp4`,
                                    caption: `> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ thenux ᴛᴇᴄʜ*
`,
                                },
                                { quoted: mek },
                            );
                        }

                        // React to the successful completion of the task
                        await conn.sendMessage(from, {
                            react: { text: "", key: mek.key },
                        });

                        console.log("Response sent successfully");
                    } else {
                        // Handle invalid input (not 1 or 2)
                        await conn.sendMessage(from, {
                            react: { text: "❓", key: mek.key },
                        });
                        reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖤𝗇𝗍𝖾𝗋 `𝖵𝖺𝗅𝗂𝖽 𝖮𝗉𝗍𝗂𝗈𝗇 1 𝖮𝗋 2` ❗");
                    }
                }
            });
        } catch (e) {
            console.log(e);
            reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖵𝗂𝖽𝖾𝗈 𝖳𝖺𝗍𝗂𝗅𝖾 𝖮𝗋 𝖴𝗋𝗅` ❗");
        }
    },
);