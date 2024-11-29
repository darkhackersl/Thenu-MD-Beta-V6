
const {readEnv} = require('../lib/database')
const {cmd, commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')

cmd({
    pattern: "menu",
    alias: ["panel", "penal", "list", "allmenu"],
    react: "♻️",
    desc: "Check menu all",
    category: "main",
    filename: __filename
}, async (conn, mek, m, {from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {

        // RAM usage
        const totalRAM = Math.round(require('os').totalmem() / 1024 / 1024); // Total RAM in MB
        const usedRAM = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2); // Used RAM in MB
        const freeRAM = (totalRAM - parseFloat(usedRAM)).toFixed(2); // Free RAM in MB
        const config = await readEnv();
let menu = {
 main: '',
 download: '',
 group: '',
 owner: '',
 ai: '',
 convert: '',
 tools: '',
 search: '',
 fun: '',
 economy: '',
};

for (let i = 0; i < commands.length; i++) { if (commands[i].pattern && !commands[i].dontAddCommandList) { menu[commands[i].category] += `${config.PREFIX}${commands[i].pattern}\n`; } }

        let status = `*✸𝕎𝔼𝕃ℂ𝕆𝕄𝔼 𝕋𝕆 𝕋𝕙𝕖𝕟𝕦 𝕄𝔻 𝔹𝕆𝕋✸*

╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ 」

 ❄️  Uptime : *${runtime(process.uptime())}*

 ❄️  Used :*${usedRAM} MB*

 ❄️  Free : *${freeRAM} MB*

 ❄️  Total : *${totalRAM} MB*

 ❄️  Owner : *THENUX (THENULA PANAPITI)*

╰───────────◉◉►


╭───────────◉◉►
> .settings = Customize Bot Settings Work For Owner Only.❄️
> .panel = get all menu list
╰───────────◉◉►


*Reply to this message, type the number in the relevant menu and send ⤵️*
┏━━━━━━━━━━━━━━┓
┃───────────◉◉►

 🌻 *NON_BUTTON_MENU* 🌻
  │   ───────
> ┃1 💥_𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔_⤵💥

> ┃2 💥_𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐍𝐔_⤵💥
 
> ┃3 💥_𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐌𝐄𝐍𝐔_⤵💥
 
> ┃4 💥_TOOL 𝐌𝐄𝐍𝐔_⤵💥

> ┃5 💥_FUN 𝐌𝐄𝐍𝐔_⤵💥

> ┃6 💥_SEARCH 𝐌𝐄𝐍𝐔_⤵💥

> ┃7 💥_OWNER 𝐌𝐄𝐍𝐔_⤵💥

> ┃8 💥_CONVERT 𝐌𝐄𝐍𝐔_⤵💥

> ┃9 💥_AI 𝐌𝐄𝐍𝐔_⤵💥

┃───────────◉◉►
┗━━━━━━━━━━━━━━┛

*✸𝕋𝕙𝕖𝕟𝕦 𝕄𝔻 𝔹𝕆𝕋✸*`

        // URL of the image you want to include
        const imageUrl = 'https://i.ibb.co/QXW2jmR/NEW-BETA.png'; // Replace with your actual image URL

        // Send the image with the status as the caption
        const sentMsg = await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: status
        }, { quoted: mek || null });

        setTimeout(async () => {
            await conn.sendMessage(from, { delete: sentMsg.key });
        }, 90000); // 10 seconds timeout for deletion



conn.ev.on('messages.upsert', async (msgUpdate) => {
    const msg = msgUpdate.messages[0];
    if (!msg.message || !msg.message.extendedTextMessage) return;
    const selectedOption = msg.message.extendedTextMessage.text.trim();
    
    if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === sentMsg.key.id) {
        switch (selectedOption) {
            case '1':
                responseText = `.main`;
            
                const messageContent1 = {
                    text: responseText,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363318466798359@newsletter',
                            newsletterName: "THENU-MD-V6",
                            serverMessageId: 143
                        }
                    }
                };
            
                await conn.sendMessage(from, messageContent1, { quoted: mek });
                break;
                
                    case '2':
                        responseText = `.groupmenu`;
            
                        const messageContent2 = {
                            text: responseText,
                            contextInfo: {
                                mentionedJid: [m.sender],
                                forwardingScore: 999,
                                isForwarded: true,
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: '120363318466798359@newsletter',
                                    newsletterName: "THENU-MD-V6",
                                    serverMessageId: 143
                                }
                            }
                        };
                    
                        await conn.sendMessage(from, messageContent2, { quoted: mek });
                        break;
                        
                        case '3':
                           responseText = `.download`;
            
                const messageContent3 = {
                    text: responseText,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363318466798359@newsletter',
                            newsletterName: "THENU-MD-V6",
                            serverMessageId: 143
                        }
                    }
                };
            
                await conn.sendMessage(from, messageContent3, { quoted: mek });
                break;
                
                            case '4':
                                responseText = `.tools`;
            
                                const messageContent4 = {
                                    text: responseText,
                                    contextInfo: {
                                        mentionedJid: [m.sender],
                                        forwardingScore: 999,
                                        isForwarded: true,
                                        forwardedNewsletterMessageInfo: {
                                            newsletterJid: '120363318466798359@newsletter',
                                            newsletterName: "THENU-MD-V6",
                                            serverMessageId: 143
                                        }
                                    }
                                };
                            
                                await conn.sendMessage(from, messageContent4, { quoted: mek });
                                break;
                                
                                case '5':
                                    responseText = `.fun`;
            
                const messageContent5 = {
                    text: responseText,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363318466798359@newsletter',
                            newsletterName: "THENU-MD-V6",
                            serverMessageId: 143
                        }
                    }
                };
            
                await conn.sendMessage(from, messageContent5, { quoted: mek });
                break;
                
                                    case '6':
                                        responseText = `.search`;
            
                                        const messageContent6 = {
                                            text: responseText,
                                            contextInfo: {
                                                mentionedJid: [m.sender],
                                                forwardingScore: 999,
                                                isForwarded: true,
                                                forwardedNewsletterMessageInfo: {
                                                    newsletterJid: '120363318466798359@newsletter',
                                                    newsletterName: "THENU-MD-V6",
                                                    serverMessageId: 143
                                                }
                                            }
                                        };
                                    
                                        await conn.sendMessage(from, messageContent6, { quoted: mek });
                                        break;
                                        
                                        case '7':
                                            responseText = `.ownermenu`;
            
                                            const messageContent7 = {
                                                text: responseText,
                                                contextInfo: {
                                                    mentionedJid: [m.sender],
                                                    forwardingScore: 999,
                                                    isForwarded: true,
                                                    forwardedNewsletterMessageInfo: {
                                                        newsletterJid: '120363318466798359@newsletter',
                                                        newsletterName: "THENU-MD-V6",
                                                        serverMessageId: 143
                                                    }
                                                }
                                            };
                                        
                                            await conn.sendMessage(from, messageContent7, { quoted: mek });
                                            break;
                                            
                                            case '8':
                                                responseText = `.convert`;
            
                const messageContent8 = {
                    text: responseText,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363318466798359@newsletter',
                            newsletterName: "THENU-MD-V6",
                            serverMessageId: 143
                        }
                    }
                };
            
                await conn.sendMessage(from, messageContent8, { quoted: mek });
                break;
                
                                                case '9':
                                                    responseText = `.aimenu`;
            
                                                    const messageContent9 = {
                                                        text: responseText,
                                                        contextInfo: {
                                                            mentionedJid: [m.sender],
                                                            forwardingScore: 999,
                                                            isForwarded: true,
                                                            forwardedNewsletterMessageInfo: {
                                                                newsletterJid: '120363318466798359@newsletter',
                                                                newsletterName: "THENU-MD-V6",
                                                                serverMessageId: 143
                                                            }
                                                        }
                                                    };
                                                
                                                    await conn.sendMessage(from, messageContent9, { quoted: mek });
                                                    break;
                                                    
            default:
                reply("Invalid option. Please select a valid menu option (1-4).");
        }
   
setTimeout(async () => {
            await conn.sendMessage(from, { delete: msg.key });
        }, 900000); // 1000 seconds timeout for deletion
}
});

} catch (e) {
console.log(e)
reply(`Error: ${e}`)
}
});