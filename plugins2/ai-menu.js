const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')

cmd({
  pattern: "aimenu",
  desc: "get bot ai cmd.",
  category: "ai",
  react: "📩",
  filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
let menu = {
ai: '',
  };

    for (let i = 0; i < commands.length; i++) { if (commands[i].pattern && !commands[i].dontAddCommandList) { menu[commands[i].category] += `${config.PREFIX}${commands[i].pattern}\n`; } }


   let madeMenu = `
*👋 Hello ${pushname}*

> 👨‍💻 ​🇹​​🇭​​🇪​​🇳​​🇺​-​🇲​​🇩​ ​🇲​​🇪​​🇳​​🇺​👨‍💻

👨🏻‍💻⚟ *ɴᴀᴍᴇ ʙᴏᴛ* : ᵀʰᵉⁿᵘ⁻ᴹᴰ💫
👨🏻‍💻⚟ *ᴄʀᴇᴀᴛᴏʀ* :  𝓣𝓱𝓮𝓷𝓾𝓵𝓪 𝓟𝓪𝓷𝓪𝓹𝓲𝓽𝓲💫
👨🏻‍💻⚟*ᴠᴇʀsɪᴏɴs* : 6.0.0 (ᴀᴅᴅᴇᴅ ʜɪᴅᴅᴇɴ ғᴇᴀᴜᴛᴜʀᴇs)💫
👨🏻‍💻⚟ *ᴄᴏɴᴛᴀᴄᴛ* : https://wa.me/94757096717 💫

╭───────────●●►
│📜 AI COMMANDS
│───────
${menu.ai}
╰───────────●●►
  `
  await conn.sendMessage(from, {
      audio: { url: 'https://github.com/prabathLK/AUTO-VOICE-SENDER-PRABATH-MD-/raw/refs/heads/main/plugins/bgm/AUD-20221018-WA0251.mp3'},
      mimetype: 'audio/mp4',
      ptt: true
  }, { quoted: mek });
await conn.sendMessage(from,{image:{url:"https://i.ibb.co/7JX7PHG/AI.png"},caption:madeMenu},{quoted:mek})

}catch(e){
  console.log(e)
  reply(`${e}`)
  }
  })