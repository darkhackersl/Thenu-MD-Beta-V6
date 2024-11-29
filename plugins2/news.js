const { cmd } = require('../command');
const Hiru = require("hirunews-scrap");
const Esana = require("esana-news.js");

let activeGroups = {};
let lastNewsTitles = {};

async function getLatestNews() {
  let newsList = [];
  
  try {
    const hiruNews = new Hiru();
    const hiruBreakingNews = await hiruNews.BreakingNews();
    newsList.push({
      title: hiruBreakingNews.results.title,
      content: hiruBreakingNews.results.news,
      date: hiruBreakingNews.results.date,
      thumb: hiruBreakingNews.results.thumb
    });
  } catch (error) {
    console.error("Error fetching Hiru News: " + error.message);
  }
  
  try {
    const esanaNews = new Esana();
    const idl = await esanaNews.latest_id()
    const esanaLatestNews = await esanaNews.news(idl.results.news_id);
    const esanresults =  esanaLatestNews.results;

    if (esanresults && esanresults.TITLE && esanresults.full_news && esanresults.PUBLISHED &&  esanresults.COVER) {

      newsList.push({
        title: esanresults.TITLE,
        content: esanresults.full_news,
        date: esanresults.PUBLISHED,
        thumb:  esanresults.COVER

      });
    } else {
      console.error("Error: Esana News returned invalid data.");
    }
  } catch (error) {
    console.error("Error fetching Esana News: " + error.message);
  }
  
  return newsList;
}

async function checkAndPostNews(bot, groupId) {
  const latestNews = await getLatestNews();
  global.newsBotName = "> THENU-MD";
  
  latestNews.forEach(async newsItem => {
    if (!lastNewsTitles[groupId]) {
      lastNewsTitles[groupId] = [];
    }

    if (!lastNewsTitles[groupId].includes(newsItem.title)) {
      await bot.sendMessage(groupId, {image: { url: `${newsItem.thumb}`, mimetype: "image/jpeg" }, caption: `📰 *Latest News Update*:\n\n*${newsItem.title}*\n\n[ ${newsItem.date} ]\n\n${newsItem.content}\n\n${newsBotName}`
      });

      lastNewsTitles[groupId].push(newsItem.title);
      
      if (lastNewsTitles[groupId].length > 100) {
        lastNewsTitles[groupId].shift();
      }
    }
  });
}

async function getHiruNews() {
  try {
    const hiruNews = new Hiru();
    const hiruBreakingNews = await hiruNews.BreakingNews();
    return {
      title: hiruBreakingNews.results.title,
      content: hiruBreakingNews.results.news,
      date: hiruBreakingNews.results.date,
      thumb: hiruBreakingNews.results.thumb
    };
  } catch (error) {
    console.error("Error fetching Hiru News: " + error.message);
    return null;
  }
}

cmd({
  pattern: "hiru",
  desc: "Fetch the latest news from Hiru",
  react: '📰',
  category: "news",
  filename: __filename
}, async (bot, message, args, { from }) => {
  const hiruNews = await getHiruNews();
  global.newsBotName2 = "```THARUX-MD```";
  if (hiruNews) {
  await bot.sendPresenceUpdate('composing', from);
    await bot.sendMessage(from, {image: { url: `${hiruNews.thumb}`, mimetype: "image/jpeg" }, caption: `📰 *Hiru News Update*:\n\n*${hiruNews.title}*\n\n[ *${hiruNews.date}* ]\n\n${hiruNews.content}\n\n${newsBotName2}`
    });
  } else {
    await bot.sendMessage(from, {
      text: "❌ Failed to fetch Hiru News. Please try again later."
    });
  }
});

cmd({
  pattern: 'newson',
  desc: "Enable Sri Lankan news updates in this group",
  isGroup: true,
  react: '📰',
  filename: __filename
}, async (bot, message, args, { from, isGroup, participants }) => {
  if (isGroup) {
    const isAdmin = participants.some(p => p.id === message.sender && p.admin) || message.sender === bot.user.jid;
    
    if (isAdmin) {
      if (!activeGroups[from]) {
        activeGroups[from] = true;
        await bot.sendMessage(from, { text: "📰 *24/7 News Activated!* 🎉" });
        
        if (!activeGroups.interval) {
          activeGroups.interval = setInterval(async () => {
            for (const groupId in activeGroups) {
              if (activeGroups[groupId] && groupId !== 'interval') {
                await checkAndPostNews(bot, groupId);
              }
            }
          }, 30000);
        }
      } else {
        await bot.sendMessage(from, { text: "📰 *24/7 News is already activated!*" });
      }
    } else {
      await bot.sendMessage(from, { text: "🚫 *This command can only be used by group admins or the bot owner.*" });
    }
  } else {
    await bot.sendMessage(from, { text: "❌ *This command can only be used in groups.*" });
  }
});

cmd({
  pattern: "newsoff",
  desc: "Disable Sri Lankan news updates in this group",
  isGroup: true,
  react: '🛑',
  filename: __filename
}, async (bot, message, args, { from, isGroup, participants }) => {
  if (isGroup) {
    const isAdmin = participants.some(p => p.id === message.sender && p.admin) || message.sender === bot.user.jid;
    
    if (isAdmin) {
      if (activeGroups[from]) {
        delete activeGroups[from];
        await bot.sendMessage(from, { text: "🛑 *24/7 News Deactivated.*" });

        if (Object.keys(activeGroups).length === 1 && activeGroups.interval) {
          clearInterval(activeGroups.interval);
          delete activeGroups.interval;
        }
      } else {
        await bot.sendMessage(from, { text: "🛑 *24/7 News is not active in this group.*" });
      }
    } else {
      await bot.sendMessage(from, { text: "🚫 *This command can only be used by group admins or the bot owner.*" });
    }
  } else {
    await bot.sendMessage(from, { text: "❌ *This command can only be used in groups.*" });
  }
});

cmd({
  pattern: "newscheck",
  desc: "Check if the Sri Lankan news service is active in this group",
  isGroup: true,
  react: '🔍',
  filename: __filename
}, async (bot, message, args, { from }) => {
  if (activeGroups[from]) {
    await bot.sendMessage(from, { text: "📰 *The 24/7 news service is currently active in this group.*" });
  } else {
    await bot.sendMessage(from, { text: "🛑 *The 24/7 news service is not active in this group.*" });
  }
});
