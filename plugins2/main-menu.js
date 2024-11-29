//████████╗██╗  ██╗███████╗███╗   ██╗██╗   ██╗    ███╗   ███╗██████╗ 
//╚══██╔══╝██║  ██║██╔════╝████╗  ██║██║   ██║    ████╗ ████║██╔══██╗
//   ██║   ███████║█████╗  ██╔██╗ ██║██║   ██║    ██╔████╔██║██║  ██║
//   ██║   ██╔══██║██╔══╝  ██║╚██╗██║██║   ██║    ██║╚██╔╝██║██║  ██║
//   ██║   ██║  ██║███████╗██║ ╚████║╚██████╔╝    ██║ ╚═╝ ██║██████╔╝
//   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝     ╚═╝     ╚═╝╚═════╝ 
                                                                   
























const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')

cmd({
    pattern: "main",
    desc: "get bot main cmd.",
    category: "main",
    react: "😒",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
let menu = {
 main: '',
    };

      for (let i = 0; i < commands.length; i++) { if (commands[i].pattern && !commands[i].dontAddCommandList) { menu[commands[i].category] += `${config.PREFIX}${commands[i].pattern}\n`; } }


     let madeMenu = `
   ◈╾──*👋 Hello ${pushname}*──╼◈
│*📝 Bot Name:* Thenu-MD
│*👤 Owner:* Thenux
│*📱 Bot Number:* wa.me/${config.BOT_NUMBER}
│*📝 Prefix:* ${config.PREFIX}


╭────────────◉◉►
│👨🏻‍💻⚟ *ɴᴀᴍᴇ ʙᴏᴛ* : ᵀʰᵉⁿᵘ⁻ᴹᴰ💫
│👨🏻‍💻⚟ *ᴄʀᴇᴀᴛᴏʀ* :  𝓣𝓱𝓮𝓷𝓾𝓵𝓪 𝓟𝓪𝓷𝓪𝓹𝓲𝓽𝓲💫
│👨🏻‍💻⚟*ᴠᴇʀsɪᴏɴs* :  BETA V.6.0.0 💫
│👨🏻‍💻⚟ *ᴄᴏɴᴛᴀᴄᴛ* : https://wa.me/94757096717 💫
╰───────────◉◉►

╭───────────◉◉►
│
│◈╾──📜 MAIN COMMANDS──╼◈
│
│───────────────
  ${menu.main}
╰───────────●●►
    `
    await conn.sendMessage(from, {
          audio: { url: 'https://github.com/prabathLK/AUTO-VOICE-SENDER-PRABATH-MD-/raw/refs/heads/main/plugins/bgm/AUD-20221018-WA0251.mp3'},
          mimetype: 'audio/mp4',
          ptt: true
      }, { quoted: mek });
            
      const messageContent7 = {
          
          document: { url: "https://i.ibb.co/QXW2jmR/NEW-BETA.png" },
          mimetype: 'application/pdf',
          fileName: 'Thenu-MD-Beta.pdf',
          caption: madeMenu,
          footer: '> ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ʙʏ Thenu ᴍᴅ\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ • Theux-AI',
          contextInfo: {
              mentionedJid: [m.sender],
              forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363318466798359@newsletter',
                  newsletterName: "THENU-MD-V6",
                  serverMessageId: 143,
                  externalAdReply: {
                    title: 'Thenu-MD',
                    body: 'Thenux-AI',
                    mediaType: 1, // Media type for external ad
                    thumbnail: { url: 'https://i.ibb.co/HDCFS9F/Thenu-MD-new-card-ofc.png' },
                    renderLargerThumbnail: true,
                    sourceUrl: "https://github.com/darkhackersl"
                },
            
            
              }
          }
      };
 await conn.sendMessage(from, messageContent7, {image:{url:"https://i.ibb.co/J5FHD4j/MAIN.png"},caption:madeMenu},{quoted:mek})

 }catch(e){
    console.log(e)
    reply(`${e}`)
    }
    })