const mongoose = require('mongoose');
const config = require('../config');
const EnvVar = require('./mongodbenv');

const defaultEnvVariables = [
    { key: 'ALIVE_IMG', value: 'https://i.ibb.co/hZp66L6/THENU-MD-LOGO.png' },
    { key: 'ALIVE_MSG', value: 'Hello , I am alive now!!\nIm `Thenu-MD Whatsapp WA BOT`.\n\nCreated by Thenula Pnanapiti.📡❤️.\nPlease Use Bot Correctly.' },
    { key: 'PREFIX', value: '.' },
    { key: 'AUTO_READ_STATUS', value: 'false' },
    { key: 'MODE', value: 'public' },
    { key: 'AUTO_VOICE', value: 'true' },
    { key: 'AUTO_STICKER', value: 'true' },
    { key: 'AUTO_REPLY', value: 'true' },
    { key: 'BUTTON', value: 'true' },
    { key: 'NSFW', value: 'false' },
    { key: 'ANTI_BAD_WORD', value: 'true' },
];

// MongoDB connection function
const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB);
        console.log('🛜 MongoDB Connected ✅');

        // Check and create default environment variables
        for (const envVar of defaultEnvVariables) {
            const existingVar = await EnvVar.findOne({ key: envVar.key });

            if (!existingVar) {
                // Create new environment variable with default value
                await EnvVar.create(envVar);
                console.log(`➕ Created default env var: ${envVar.key}`);
            }
        }

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
