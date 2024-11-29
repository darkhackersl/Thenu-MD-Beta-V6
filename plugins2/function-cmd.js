const { cmd } = require('../command')
const fs = require('fs');
const path = require('path');
const config = require('../config')
// List of bad words to check against
 // Replace with actual words
cmd({
  on: "body"
},
async (conn,mek, m, { from, body, isGroup, isAdmins, isBotAdmins, reply, sender }) => {
    try {
    
        const badWords = ["wtf", "mia", "xxx","fuck","sex","huththa","pakaya","ponnaya","hutto"]
        if (!isGroup || isAdmins || !isBotAdmins) return; // Skip if not in group, or sender is admin, or bot is not admin
      
        const lowerCaseMessage = body.toLowerCase();
        const containsBadWord = badWords.some(word => lowerCaseMessage.includes(word));
        
        if (containsBadWord & config.ANTI_BAD_WORD === 'true') {
          await conn.sendMessage(from, { delete: mek.key }, { quoted: mek });
          await conn.sendMessage(from, { text: "🚫 ⚠️BAD WORDS NOT ALLOWED⚠️ 🚫" }, { quoted: mek });
        }
    } catch (error) {
        console.error(error)
        reply("An error occurred while processing the message.")
    }
})


cmd({
    on: "revokedMessage"
}, async (conn, mek, m, { from, sender, reply }) => {
    try {
        const participant = mek.participant || sender; // User who deleted the message
        const revokedMessage = mek.message || null; // Deleted message content
        const messageType = revokedMessage ? Object.keys(revokedMessage)[0] : "unknown"; // Type of deleted message

        // Rebuild the message and send details
        if (revokedMessage) {
            let content = "";
            if (messageType === "imageMessage" || messageType === "videoMessage") {
                content = `📷 A media message was deleted.`;
            } else if (messageType === "documentMessage") {
                content = `📄 A document was deleted.`;
            } else if (messageType === "conversation" || messageType === "extendedTextMessage") {
                content = `💬 Deleted message: "${revokedMessage.conversation || revokedMessage.extendedTextMessage.text}"`;
            } else {
                content = `🔄 A different type of message was deleted.`;
            }

            // Send details about the deleted message
            await conn.sendMessage(
                from,
                {
                    text: `⚠️ **Anti Delete Alert** ⚠️\n\n👤 **By:** @${participant.split('@')[0]}\n⏰ **Time:** ${new Date().toLocaleString()}\n📌 **Details:**\n${content}`,
                    mentions: [participant],
                },
                { quoted: mek }
            );

            // If it's an image or video, resend the media
            if (messageType === "imageMessage" || messageType === "videoMessage") {
                await conn.sendMessage(
                    from,
                    {
                        [messageType === "imageMessage" ? "image" : "video"]: revokedMessage[messageType].url,
                        caption: `Resending deleted media by @${participant.split('@')[0]}`,
                        mentions: [participant],
                    },
                    { quoted: mek }
                );
            }
        }
    } catch (error) {
        console.error(error);
        reply("🚫 An error occurred while processing the deleted message.");
    }
});



const linkPatterns = [
    /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi,   // WhatsApp group or chat links
    /wa\.me\/\S+/gi,                                      // wa.me links without https
    /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,           // Telegram links
    /https?:\/\/(?:www\.)?youtube\.com\/\S+/gi,           // YouTube links
    /https?:\/\/youtu\.be\/\S+/gi,                        // YouTube short links
    /https?:\/\/(?:www\.)?facebook\.com\/\S+/gi,          // Facebook links
    /https?:\/\/fb\.me\/\S+/gi,                           // Facebook short links
    /https?:\/\/(?:www\.)?instagram\.com\/\S+/gi,         // Instagram links
    /https?:\/\/(?:www\.)?twitter\.com\/\S+/gi,           // Twitter links
    /https?:\/\/(?:www\.)?tiktok\.com\/\S+/gi,            // TikTok links
    /https?:\/\/(?:www\.)?linkedin\.com\/\S+/gi,          // LinkedIn links
    /https?:\/\/(?:www\.)?snapchat\.com\/\S+/gi,          // Snapchat links
    /https?:\/\/(?:www\.)?pinterest\.com\/\S+/gi,         // Pinterest links
    /https?:\/\/(?:www\.)?reddit\.com\/\S+/gi,            // Reddit links
    /https?:\/\/ngl\/\S+/gi,                              // NGL links
    /https?:\/\/(?:www\.)?discord\.com\/\S+/gi,           // Discord links
    /https?:\/\/(?:www\.)?twitch\.tv\/\S+/gi,             // Twitch links
    /https?:\/\/(?:www\.)?vimeo\.com\/\S+/gi,             // Vimeo links
    /https?:\/\/(?:www\.)?dailymotion\.com\/\S+/gi,       // Dailymotion links
    /https?:\/\/(?:www\.)?medium\.com\/\S+/gi             // Medium links
];

cmd({
    on: "body"
}, async (conn, mek, m, { from, body, sender, isGroup, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup || isAdmins || !isBotAdmins) return; // Skip if not in group, or sender is admin, or bot is not admin

        const containsLink = linkPatterns.some(pattern => pattern.test(body));

        if (containsLink && config.ANTI_LINK === 'true') {
            // Delete the message
            await conn.sendMessage(from, { delete: mek.key }, { quoted: mek });

            // Warn the user
            await conn.sendMessage(from, { text: `⚠️ Links are not allowed in this group.\n@${sender.split('@')[0]} has been removed. 🚫`, mentions: [sender] }, { quoted: mek });

            // Remove the user from the group
            await conn.groupParticipantsUpdate(from, [sender], 'remove');
        }
    } catch (error) {
        console.error(error);
        reply("An error occurred while processing the message.");
    }
});
