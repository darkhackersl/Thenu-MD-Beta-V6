const config = require('../config')
const {cmd , commands} = require('../command')
const {
    checkAccess,
    isPremiumUser,
    blacklistedJIDs,
    premiumJIDs,
    dataLoaded,
} = require("../lib/accessControl");

const {sleep} = require('../lib/functions')

cmd({
    pattern: "shutdown",
    desc: "restart the bot",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const senderNumber = m.sender;
    const isGroup = m.isGroup || false;

    // Check access permissions
    if (!checkAccess(senderNumber, isGroup)) {
        if (blacklistedJIDs.includes(senderNumber)) {
            return reply("*🚫 You are blacklisted. Access denied.*");
        } else {
            return reply("*😢 Access denied*. You don't have permission to use this command.Please buy *0PREMIUM* Version !.\n\n> Contact Owner\n_94767096711_\n\n`💸Premium version price` *FREE!*");
        }
    }
const {exec} = require("child_process")
reply("*⚡🏳️Shuting Down...*\n\n> Thenu-MD-Beta-V6.0.0")
await sleep(1500)
exec("pm2 stop Thenu-MD-V2")
}catch(e){
console.log(e)
reply(`${e}`)
}
})