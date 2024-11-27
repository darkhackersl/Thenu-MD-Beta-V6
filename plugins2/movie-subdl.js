const { SinhalaSub } = require('@sl-code-lords/movie-api');
const { cmd, commands } = require('../command');
const { PixaldrainDL } = require("pixaldrain-sinhalasub");
const path = require('path');
const fs = require('fs');

cmd({
    pattern: "sl2",
    alias: ["sin1", "sinhala1"],
    desc: "Download movies from CineSubz.",
    category: "download",
    use: '.apk whatsapp',
    filename: __filename
},
async (conn, mek, m, { from, prefix, l, quoted, bodys, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
      try {
        // Ensure the input is in the correct format
        if (!q || !q.includes('&')) return reply('🚩 *Please provide both the JID and movie link or name in the format: "jid&movie link or name"');

        // Parse the command into JID and movie info
        let [jid, movieQuery] = q.split('&').map(val => val.trim());

        if (!jid || !movieQuery) {
            return reply('🚩 Invalid format. Please provide both a JID and a movie link or name.');
        }

        // Fetch the movie details
        const res = await fetch(`${domain}misc/sdownload-link?url=${movieQuery}&apikey=${ak}`);
        const aparade = await res.json();
        const result = aparade.data;

        if (!result || !result.downloadLink) {
            return reply('🚩 Failed to fetch movie details or download link.');
        }

        const downloadLink = result.downloadLink;
        const movieName = movieQuery.split('/').pop(); // Extract movie name from the URL or use provided movie name

        // Optionally, send the download link as a file
          await conn.sendMessage(jid, {
              document: { url: downloadLink },
              mimetype: 'video/mp4',
              fileName: `${movieName}.mp4`
          }, { quoted: mek });
          } catch (e) {
          console.log(e);
          reply('🚩 *Error:* ' + (e.message || e));
          } // <-- Closing curly brace added here
});