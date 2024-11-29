const { cmd, commands } = require('../command');

// Auto-forward view-once photo or video and send a reply
cmd({
    on: "message-new"
}, async (conn, mek) => {
    
    // Check if the message contains view-once media (photo or video)
    if (mek.message && mek.message.viewOnceMessage && mek.message.viewOnceMessage.message) {
        const mediaMessage = mek.message.viewOnceMessage.message;

        // Media detection: Check if it's an image or video
        if (mediaMessage.imageMessage) {
            // It's a view-once photo, forward it to the owner
            await conn.sendMessage(mek.key.remoteJid, { text: "I received your view-once photo!" }, { quoted: mek });
            
            // Optionally, send a reply with any desired text or media
            await conn.sendMessage(mek.key.remoteJid, { text: "Here is my reply to your view-once photo!" }, { quoted: mek });

        } else if (mediaMessage.videoMessage) {
            // It's a view-once video, forward it to the owner
            await conn.sendMessage(mek.key.remoteJid, { text: "I received your view-once video!" }, { quoted: mek });
            
            // Optionally, send a reply with any desired text or media
            await conn.sendMessage(mek.key.remoteJid, { text: "Here is my reply to your view-once video!" }, { quoted: mek });
        }
    }
});