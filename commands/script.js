function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
const commands = [
  { "name": "!help", "category": "General", "description": "Shows a list of all commands." },
  { "name": "!uptime", "category": "General", "description": "Check bot uptime." },

  { "name": "!bj <amount>", "category": "Games", "description": "Play Blackjack with the bot." },
  { "name": "!slot", "category": "Games", "description": "Spin a slot machine and try your luck!" },
  { "name": "!roulette <red|black|even|odd|number> <amount>", "category": "Games", "description": "Bet on a color, parity, or number." },
  { "name": "!rps <rock|paper|scissors>", "category": "Games", "description": "Play Rock-Paper-Scissors against the bot." },
  { "name": "!fight @user", "category": "Games", "description": "Start a fight with another user. Random winner." },
  { "name": "!8ball [question]", "category": "Games", "description": "Ask the magic 8-ball anything." },
  { "name": "!stats bj @user", "category": "Games", "description": "Show a person's Blackjack stats." },
  { "name": "!stats roulette @user", "category": "Games", "description": "Show a person's Roulette stats." },
  { "name": "!showstats", "category": "Games", "description": "Show top 5 players in Blackjack and Roulette." },
  { "name": "!trivia", "category": "Games", "description": "Play a multiple choice question trivia game." },
  { "name": "!trivia lb", "category": "Games", "description": "Show the top 5 best trivia players." },

  { "name": "!loaninfo", "category": "Economy", "description": "Check your active loans and debts." },
  { "name": "!loan [amount]", "category": "Economy", "description": "Take a loan with 5% interest."},
  { "name": "!payloan", "category": "Economy", "description": "Pay your loan."},
  { "name": "!balance [@user]", "category": "Economy", "description": "Check your or someone else’s balance." },
  { "name": "!leaderboard/!top", "category": "Economy", "description": "See the top 5 richest users." },
  { "name": "!bottom", "category": "Economy", "description": "See the bottom 5 poorest users." },
  { "name": "!donate @user amount", "category": "Economy", "description": "Donate money to another user." },
  { "name": "!work", "category": "Economy", "description": "Work to earn money (1 hour cooldown)." },
  { "name": "!daily", "category": "Economy", "description": "Claim your daily reward (24 hour cooldown)." },
  { "name": "!rob @user", "category": "Economy", "description": "Attempt to rob another user (50% success, risk of penalty)." },
  
  { "name": "!mafia create", "category": "Mafia", "description": "Create a new Mafia game lobby." },
  { "name": "!mafia join", "category": "Mafia", "description": "Join an existing Mafia game." },
  { "name": "!mafia start", "category": "Mafia", "description": "Start the Mafia game (host only)." },
  { "name": "!mafia kill player", "category": "Mafia", "description": "Kill a player (Mafia DM only)." },
  { "name": "!mafia vote player", "category": "Mafia", "description": "Vote to eliminate a player during the day phase." },

  { "name": "!ship @user1 @user2", "category": "Fun & Social", "description": "Check love compatibility between two users." },
  { "name": "!truth", "category": "Fun & Social", "description": "Get a truth question." },
  { "name": "!dare", "category": "Fun & Social", "description": "Get a dare question." },
  { "name": "!nhie", "category": "Fun & Social", "description": "Get a Never Have I Ever question." },
  { "name": "!wyr", "category": "Fun & Social", "description": "Play Would You Rather with random questions." },
  { "name": "!pickup", "category": "Fun & Social", "description": "Get a random pickup line." },
  { "name": "!drake [text1] [text2]", "category": "Fun & Social", "description": "Create a Drake meme with two texts." },
  { "name": "!music [song name]", "category": "Music", "description": "Download and send a song from YouTube." },
  { "name": "!sticker", "category": "Fun & Social", "description": "Convert a replied image to a sticker." },
  { "name": "!unsticker", "category": "Fun & Social", "description": "Convert a replied sticker to an image." },
  { "name": "!pick option1 option2 option3 ...", "category": "Fun & Social", "description": "Randomly pick one of the options." },
  { "name": "!giveaway [time]<s/m/h> [amount]", "category": "Fun & Social", "description": "Start a giveaway in the group chat." },
  { "name": "!animal [animal name]", "category": "Fun & Social", "description": "Get a random fact of the specified animal." },
  { "name": "!fact", "category": "Fun & Social", "description": "Get a random fact." },
  { "name": "!tts [text]", "category": "Fun & Social", "description": "Convert text to speech." },

  { "name": "!most", "category": "Bot-related", "description": "Get the most active users." },
  { "name": "!least", "category": "Bot-related", "description": "Get the least active users." },
  { "name": "!mostused", "category": "Bot-related", "description": "Get the most used commands." },
  { "name": "!leastused", "category": "Bot-related", "description": "Get the least used commands." },
  { "name": "!uptime", "category": "Bot-related", "description": "Check how long the bot has been running." },
  { "name": "!suggest [feature]", "category": "Bot-related", "description": "Request new features." },
  { "name": "!bot", "category": "Bot-related", "description": "Get information on the bot." },

  { "name": "!warn @user [reason]", "category": "Moderation", "description": "Warn a user (group admins only)." },
  { "name": "!warns @user", "category": "Moderation", "description": "Check warnings for a user (group admins only)." },
  { "name": "!resetwarns @user", "category": "Moderation", "description": "Reset warnings for a user (group admins only)." },
  { "name": "!lock", "category": "Moderation", "description": "Lock a group chat (group admins only)." },
  { "name": "!unlock", "category": "Moderation", "description": "Unlock a group chat (group admins only)." },
  { "name": "!kick [@user(s)/reply to msg]", "category": "Moderation", "description": "Kick one or more users by either mentioning them or replying to their message." },

  { "name": "!gaycheck @user", "category": "Checks", "description": "Check how % gay someone is." },
  { "name": "!sleepcheck @user", "category": "Checks", "description": "Check if someone has to go to sleep or not." },
  { "name": "!smartcheck @user", "category": "Checks", "description": "Check how % smart someone is." },
  { "name": "!dumbcheck @user", "category": "Checks", "description": "Check how % dumb someone is." },
  { "name": "!hotcheck @user", "category": "Checks", "description": "Check how % hot someone is." },
  { "name": "!funnycheck @user", "category": "Checks", "description": "Check how % funny someone is." },
  { "name": "!lazycheck @user", "category": "Checks", "description": "Check how % lazy someone is." },

  { "name": "!setname [name]", "category": "Family", "description": "Set your name. Note: You can only change your name 5 times max." },
  { "name": "!marry @user", "category": "Family", "description": "Propose marriage to another user." },
  { "name": "!divorce @user", "category": "Family", "description": "Divorce your spouse." },
  { "name": "!adopt @user", "category": "Family", "description": "Adopt someone." },
  { "name": "!unadopt @user", "category": "Family", "description": "Unadopt someone." },
  { "name": "!family", "category": "Family", "description": "View your family tree." },
  { "name": "!kiss @user", "category": "Family", "description": "Send a kiss to someone." },
  { "name": "!hug @user", "category": "Family", "description": "Send a hug to someone." },
  { "name": "!cuddle @user", "category": "Family", "description": "Cuddle with someone." },
  { "name": "!slap @user", "category": "Family", "description": "Slap someone." },
  { "name": "!runaway", "category": "Family", "description": "Runaway from all of your current parents." },

  { "name": "!tt [TikTok URL]", "category": "Downloaders", "description": "Download TikTok video without watermark." },
  { "name": "!ig [Instagram URL]", "category": "Downloaders", "description": "Download Instagram photo or video." },

  { "name": "!remind [time] [message]", "category": "Reminders", "description": "Set a reminder. Time format: 10m, 2h, 1d." },
  { "name": "!remind list", "category": "Reminders", "description": "List your active reminders." },
  { "name": "!remind cancel [id]", "category": "Reminders", "description": "Cancel a specific reminder by its ID." },

  { "name": "!collect", "category": "Money", "description": "Collect money from your items." },
  { "name": "!buy [item name] <amount>", "category": "Money", "description": "Buy an item (amount is optional, default is 1)." },
  { "name": "!items <@user/reply to msg>", "category": "Money", "description": "See all of your bought items or someone else's." },
  { "name": "!upgrade [item ID] <times>", "category": "Money", "description": "Upgrade an item using its ID (times is optional, default is 1)." },
  { "name": "!shop", "category": "Money", "description": "See what the shop has in store." },
  { "name": "!claim", "category": "Money", "description": "Only use when there is an active drop in a group." },
  { "name": "!allitems", "category": "Money", "description": "See all available items."},

  { "name": "!define [word]", "category": "Random", "description": "Get the definition of a word (english word)." },
  { "name": "!cr [#PLAYER TAG]", "category": "Random", "description": "Get statistics and information about a Clash Royale player." },
  { "name": "!advice", "category": "Random", "description": "Get random advice." },
  { "name": "!kanye", "category": "Random", "description": "Get a random Kanye West quote." },
  { "name": "!stoic", "category": "Random", "description": "Get a random stoic quote." },
  { "name": "!urban [text]", "category": "Random", "description": "Get an Urban Dictionary definition of anything." },
  { "name": "!kimi", "category": "Random", "description": "Get a random Kimi Räikkönen (F1) quote." },
  { "name": "!guess age [name]", "category": "Random", "description": "Get an age for that name." },
  { "name": "!guess gender [name]", "category": "Random", "description": "Get a gender for that name." },
  { "name": "!guess ethnicity [name]", "category": "Random", "description": "Get an ethnicity for that name." },

  { "name": "!rank <@user/reply to msg>", "category": "Levels", "description": "Check eithr your or someone else's rank."},
  { "name": "!ranklb", "category": "Levels", "description": "See the top 10 most active users in a group."}
];

const container = document.getElementById("commandsContainer");
  const searchInput = document.getElementById("searchInput");

  function updateStats(list) {
    document.getElementById("totalCommands").textContent = `Total Commands: ${list.length}`;
    const categoryCount = {};
    list.forEach(c => { categoryCount[c.category] = (categoryCount[c.category] || 0) + 1; });
    const catStats = Object.entries(categoryCount).map(([cat, count]) => `${cat}: ${count}`).join(" | ");
    document.getElementById("categoryStats").textContent = `Categories: ${catStats}`;
  }

function renderCommandsByCategory(list) {
  container.innerHTML = "";
  updateStats(list);

  // Group commands by category
  const categories = {};
  list.forEach(cmd => {
    if (!categories[cmd.category]) categories[cmd.category] = [];
    categories[cmd.category].push(cmd);
  });

  Object.entries(categories).forEach(([category, cmds], index) => {
    const section = document.createElement("section");

    // Category heading
    const heading = document.createElement("h2");
    heading.className = "text-2xl font-bold mb-6 text-purple-400 border-b-2 border-purple-500 pb-2";
    heading.textContent = category;
    section.appendChild(heading);

    // Commands grid
    const grid = document.createElement("div");
    grid.className = "grid md:grid-cols-2 gap-6";
    cmds.forEach((cmd, i) => {
      const div = document.createElement("div");
      div.className = `
        bg-gray-800 p-6 rounded-3xl shadow-lg transform transition 
        hover:shadow-2xl hover:-translate-y-1 hover:ring-2 hover:ring-purple-500
      `;
      div.innerHTML = `
        <h3 class="text-xl font-bold mb-2 text-purple-300 select-none">${escapeHTML(cmd.name)}</h3>
        <p class="text-gray-300 mb-1 select-none"><strong>Category:</strong> ${cmd.category}</p>
        <p class="text-gray-100 select-none">${cmd.description}</p>
      `;
      grid.appendChild(div);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });
}

// Initial render
renderCommandsByCategory(commands);

// Filter commands on search
searchInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = commands.filter(c => 
    c.name.toLowerCase().includes(term) || 
    c.category.toLowerCase().includes(term) || 
    c.description.toLowerCase().includes(term)
  );
  renderCommandsByCategory(filtered);
});
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (
    e.key === 'F12' || 
    (e.ctrlKey && e.shiftKey && ['i','j','c'].includes(e.key.toLowerCase())) || 
    (e.ctrlKey && e.key.toLowerCase() === 'u')
  ) {
    e.preventDefault();
    alert("⚠️ This action is disabled.");
  }
});