const config = require('../config')
const {cmd , commands} = require('../command')
const { fetchJson } = require('../lib/functions')

cmd({
    pattern: "obfus",
    desc: "code.",
    category: "ai",
    react: "🤦‍♀️",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let data = await fetchJson(`https://js-obfuscator-api.vercel.app/obfuscator/code=${q})
return reply(data.obfuscatedCode`)
     }catch(e){
      console.log(e)
      reply(`${e}`)
    }
    })