const { SinhalaSub } = require('@sl-code-lords/movie-api');
const { cmd, commands } = require('../command');
const { PixaldrainDL } = require("pixaldrain-sinhalasub");
const path = require('path');
const fs = require('fs');

cmd({
    pattern: "moviedl",
    desc: "Get movie download links.",
    category: "movie",
    react: "🎥",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const input = q.trim();
        const parts = input.split("&"); // Split input by '&'

        if (parts.length < 2) {
            return reply("Please provide both the download location (JID) and the movie link in the format\n\n𝐄𝐗:*.moviedl jid 9476XXXXXXX@s.whatsapp.net&https://sinhalasub.lk/movies/the-lion-king-2019-sinhala-subtitles/.*");
        }

        const downloadLocation = parts[0].trim(); // First part as the download location (JID)
        const movieLink = parts[1].trim(); // Second part as the movie link

        const result = await SinhalaSub.movie(movieLink);
        if (!result.status) return reply("Movie details not found.");

        const movie = result.result;
        let message = `*${movie.title}*\n\n`;
        message += `Release Date: ${movie.release_date}\n`;
        message += `IMDb Rating: ${movie.IMDb_Rating}\n`;
        message += `Director: ${movie.director.name}\n\n`;
        message += `Download Location (JID): ${downloadLocation}\n\n`;
        message += `*ᴍᴏᴠɪᴇ ᴅᴇᴛᴀɪʟꜱ ᴜᴘʟᴏᴀᴅ ʙʏ ❝𝐓𝐡𝐞𝐧𝐮 𝐌𝐃❞*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ • ɴᴇᴛʜᴍɪᴋᴀᴛᴇᴄʜ*\n\n> Thenux-AI`;
       

        const imageUrl = movie.images && movie.images.length > 0 ? movie.images[0] : null;

        await conn.sendMessage(from, { image: { url: imageUrl }, caption: message }, { quoted: mek });

        const quality = "HD 720p";

        const directLink = await PixaldrainDL(movieLink, quality, "direct");

        if (directLink) {
            // Send the download link to the specified JID (downloadLocation)
            await conn.sendMessage(downloadLocation, { 
                document: { url: directLink },
                mimetype: 'video/mp4',
                fileName: '🎬MOVIE DOWNLOADER-Thenu-MD.mp4',
                caption: `*${movie.title}*\n\nDownload Location: ${downloadLocation}\n*HD 720p*\n\n*ᴍᴏᴠɪᴇ ᴜᴘʟᴏᴀᴅ ʙʏ ❝𝐓𝐡𝐞𝐧𝐮 𝐌𝐃❞*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ • ɴᴇᴛʜᴍɪᴋᴀᴛᴇᴄʜ\n\n> Thenux-AI*`
            }, { quoted: mek });

            reply("*The download has been sent to the specified location🌟*.\n\n*බාගත කිරීම නිශ්චිත ස්ථානයට යවා ඇත.🌟*\n\n> Thenu-MD");
        } else {
            reply("Could not find the 720p download link. Please check the URL or try a different movie.");
        }
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        return reply(`Error: ${e.message}`);
    }
});
