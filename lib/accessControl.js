const axios = require("axios");
const fs = require("fs");
const path = require("path");
const config = require("../config");
let blacklistedJIDs = [];
let premiumJIDs = [];
let developers = []; // New array to store developer JIDs
let dataLoaded = false;

async function loadData() {
    try {
        blacklistedJIDs = [];
        premiumJIDs = [];
        developers = []; // Initialize developers array

        // Load blacklist from local JSON file
        const localBlacklistPath = path.join(__dirname, '../lib/blacklist.json');
        try {
            const localBlacklistData = fs.readFileSync(localBlacklistPath, 'utf8');
            blacklistedJIDs = JSON.parse(localBlacklistData).jids || [];
            console.log("Blacklisted JIDs loaded from local file:", blacklistedJIDs);
        } catch (err) {
            console.error("Error loading blacklist from local file:", err);
            console.log("Falling back to remote URL for blacklist.");
        }

        // Load blacklist from remote URL if local file doesn't exist
        const blacklistResponse = await axios.get("https://raw.githubusercontent.com/vishwamihiranga/BHASHI-PUBLIC/main/blacklist.json").catch(err => {
            console.error("Error loading blacklist from remote URL:", err);
            return { data: { jids: [] } };
        });
        blacklistedJIDs = blacklistResponse.data.jids || blacklistedJIDs;

        // Load premium JIDs
        const premiumResponse = await axios.get("https://raw.githubusercontent.com/darkhackersl/Thenu-MD-DATABASE/refs/heads/main/premium.json").catch(err => {
            console.error("Error loading premium list:", err);
            return { data: { jids: [] } };
        });
        premiumJIDs = premiumResponse.data.jids || [];

        // Load developer JIDs
        const developerResponse = await axios.get("https://raw.githubusercontent.com/darkhackersl/Thenu-MD-DATABASE/refs/heads/main/developer.json").catch(err => {
            console.error("Error loading developers list:", err);
            return { data: { jids: [] } };
        });
        developers = developerResponse.data.jids || [];

        console.log("Premium JIDs and Developer JIDs loaded:", premiumJIDs, developers);
        dataLoaded = true;
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

function isPremiumUser(senderNumber) {
    return premiumJIDs.includes(senderNumber);
}

function isDeveloper(senderNumber) {
    return developers.includes(senderNumber);
}

function checkAccess(senderNumber, isGroup) {
    if (!dataLoaded) {
        console.log("Data not loaded yet. Please wait.");
        return false;
    }
    console.log("Checking access for:", senderNumber);
    const isOwner = senderNumber === config.OWNER_NUMBER;

    if (blacklistedJIDs.includes(senderNumber)) {
        console.log(`${senderNumber} is blacklisted. Access denied.`);
        return false;
    }

    if (isDeveloper(senderNumber)) {
        console.log(`${senderNumber} is a developer. Full access granted.`);
        return true; // Developers have full access
    }

    if (isPremiumUser(senderNumber)) {
        console.log(`${senderNumber} is a premium user. Access granted for premium commands.`);
        return true;
    }

    switch (config.mode) {
        case "private":
            return isOwner;
        case "public":
            return true;
        case "inbox":
            return isOwner || !isGroup;
        case "groups":
            return isOwner || isGroup;
        default:
            return isOwner;
    }
}

loadData();

module.exports = {
    checkAccess,
    isPremiumUser,
    isDeveloper,
    blacklistedJIDs,
    premiumJIDs,
    developers,
    dataLoaded
};
