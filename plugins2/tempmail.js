const { cmd, commands } = require('../command')

// Create a map to store temporary email addresses and messages
const tempEmails = new Map();

// Command for generating a temporary email address
cmd({
    pattern: "tempmail",
    desc: "Generate a temporary email address.",
    category: "search",
    react: "📧",
}, async (Void, citel) => {
    const userId = citel.sender;

    // Generate a random temporary email address
    const randomEmail = `user${Math.floor(Math.random() * 10000)}@example.com`;

    // Store the generated email address for the user
    tempEmails.set(userId, { address: randomEmail, messages: [] });

    await citel.reply(`══✪〘   *◦•●◉✿ 𝗧𝗵𝗲𝗻𝘂 𝗠𝗗 ✿◉●•◦*   〙✪══\n══✪〘   *◦•●◉✿ TEMP MAIL ✿◉●•◦*   〙✪══\n\n> ✌️Your temporary email address is:\n${randomEmail}`);
});

// Command for checking messages in the temporary email inbox
cmd({
    pattern: "checkmail",
    desc: "Check your temporary email inbox.",
    category: "search",
    react: "📧",
}, async (Void, citel) => {
    const userId = citel.sender;

    // Check if the user has a temporary email address
    if (tempEmails.has(userId)) {
        const inbox = tempEmails.get(userId).messages;

        if (inbox.length > 0) {
            // Display the received messages
            let messageList = "Your temporary email inbox:\n";
            inbox.forEach((message, index) => {
                messageList += `${index + 1}. From: ${message.from}, Subject: ${message.subject}\n`;
            });

            await citel.reply(messageList);
        } else {
            await citel.reply("Your temporary email inbox is empty.");
        }
    } else {
        await citel.reply("You don't have a temporary email address. Generate one with '.tempmail' first.");
    }
});