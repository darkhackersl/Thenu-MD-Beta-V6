const { cmd, commands } = require('../command');
const { SinhalaSub } = require('@sl-code-lords/movie-api');
const { PixaldrainDL } = require("pixaldrain-sinhalasub"); // Assuming this is for fetching download links
const path = require('path');
const fs = require('fs');

// Import fetch only if required, as PixaldrainDL likely handles the API request
const fetch = require('node-fetch'); 

cmd({
  pattern: "sl2",
  alias: ["sin1", "sinhala1"],
  desc: "Download movies from Pixaldrain.",
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

    // Use PixaldrainDL to fetch the download link for the movie
    const downloadLink = await PixaldrainDL(movieQuery); // This should be the method to fetch the download link from Pixaldrain

    if (!downloadLink) {
      return reply('🚩 Failed to fetch movie download link.');
    }

    const movieName = movieQuery.split('/').pop(); // Extract movie name from the URL or use provided movie name

    // Optionally, send the download link as a file
    await conn.sendMessage(jid, {
      document: { url: downloadLink },
      mimetype: 'video/mp4',
      fileName: '${Movie.title}.mp4' // Added the comma and backtick
    }, { quoted: mek });
  } catch (e) {
    console.log(e);
    reply('🚩 Error: ' + (e.message || e));
  }
});