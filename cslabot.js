/*
    To-Do:
        Implementovat notifikacie z Twitchu pre nas (CSLA Studio channel podla https://codepen.io/synplex/pen/goeWNb
        Implementovať kontrolu botom na kanály tak ako to má MEE6 - image only, video only ...
        Implementovať ticket systém - WIP
        ziskanie stavu dedikacov do embedu na discorde

        message.delete(); -- zmazanie commandu od usera po vlozeni
*/

// Copyright © 2022 Lukáš Maár

const Discord = require('discord.js');
const Memer = require("random-jokes-api");
const { ChannelType, PermissionsBitField } = require('discord.js');
const client = new Discord.Client();

const prefix = '!';
const welcomeChannelID = '761558359496327203';
const cslaBotToken = 'MTAxNDg3MTU4MTM3MTE1ODUyOA.GM4sh_.aIVSGN51jXbju3GLJrmaD8hOQ8OFXwZLwNJv8g';

client.on('message',message => {
// diag and help commands
  if (message.mentions.has(client.user.id)) {message.channel.send("Hello there. 😊 What do you need help with today?\n\nMy prefix is `" + `${prefix}` + "` \nRun `!help` when you're in troubles to get a list of all supported commands");}
  if (message.content.startsWith(prefix + 'help')) {message.reply('here is a list of all available commands:\n```!help - show this list\n!uptime - calculate time how long the bot is online\n!restart - restart the bot (admin only)\n!ticket - create a new support ticket\n!servers - list of official servers running with CIC\n!ping - get a pong\n!joke - get a random joke\n!chuck - get a random Chuck Norris joke\n!compliment - get a random compliment\n!meme - get a random meme image\n!csla - show all CIC links\n!biki - link to our BI Wiki page\n!ft - link to our Feedback Tracker project```');}
  if (message.content.startsWith(prefix + 'uptime')) {
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds.`;
    message.channel.send("I'm with you for " + "**" + `${uptime}` + "**")
  }

  if (message.content.startsWith(prefix + 'servers')) {
    let serverEmbed = new Discord.MessageEmbed()
    .setColor("40E0D0")
    .setTitle("Our servers")
    .setThumbnail('https://scontent.fbts6-1.fna.fbcdn.net/v/t1.18169-9/14322438_1303838882960602_6466372646523026116_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=UFXEd-MRUd8AX8y5wCf&_nc_ht=scontent.fbts6-1.fna&oh=00_AT_HMx0gylrW7oGlii2bLAD3t346ghW_hxjXnzvSTnYtjw&oe=6337D6E9')
    .setDescription("Feel free to connect to any of our servers (details below).")
    .addFields(
      { name: '[ OFFICIAL ] Arma 3 CSLA C&H EU 01', value: 'IP: 85.190.150.213:2402\nDirect connect: steam://connect/85.190.150.213:2402' },
      { name: '[ OFFICIAL ] Arma 3 CSLA SC EU 01', value: 'IP: 85.190.150.213:2502\nDirect connect: steam://connect/85.190.150.213:2502' },
      { name: '[ OFFICIAL ] Arma 3 CSLA EndGame EU 01', value: 'IP: 85.190.155.59:2502\nDirect connect: steam://connect/85.190.155.59:2502' },
      { name: '[ OFFICIAL ] Arma 3 CSLA EndGame EU 02', value: 'IP: 85.190.158.73:2502\nDirect connect: steam://connect/85.190.158.73:2502' },
      { name: '[ OFFICIAL ] Arma 3 CSLA Warlords EU 01', value: 'IP: 85.190.155.169:2302\nDirect connect: steam://connect/85.190.155.169:2302' },
      { name: '[ OFFICIAL ] Arma 3 CSLA Warlords EU 02', value: 'IP: 85.190.155.169:2402\nDirect connect: steam://connect/85.190.155.169:2402' },
      { name: '[ OFFICIAL ] Arma 3 CSLA Warlords EU 03', value: 'IP: 85.190.155.169:2502\nDirect connect: steam://connect/85.190.155.169:2502' },
      { name: '[ OFFICIAL ] [ OFFICIAL ] Arma 3 CSLA COOP EU 01', value: 'IP: 85.190.150.106:2202\nDirect connect: steam://connect/85.190.150.106:2202' },
      { name: '[ OFFICIAL ] Arma 3 CSLA COOP EU 04', value: 'IP: 109.230.208.231:2202\nDirect connect: steam://connect/109.230.208.231:2202' },
      { name: '[ OFFICIAL ] Arma 3 CSLA DM EU 01', value: 'IP: 85.190.150.106:2702\nDirect connect: steam://connect/85.190.150.106:2702' },
      { name: '[ OFFICIAL ] Arma 3 CSLA DM EU 04', value: 'IP: 109.230.208.231:2702\nDirect connect: steam://connect/109.230.208.231:2702' },
      { name: '[ OFFICIAL ] Arma 3 CSLA Zeus UK 01', value: 'IP: 185.251.226.74:2302\nDirect connect: steam://connect/185.251.226.74:2302' },
      { name: '[ OFFICIAL ] Arma 3 CSLA Combat Patrol UK 01', value: 'IP: 185.251.226.74:2402\nDirect connect: steam://connect/185.251.226.74:2402' },
      { name: '[ OFFICIAL ] Arma 3 CSLA Combat Patrol UK 02', value: 'IP: 185.251.226.74:2502\nDirect connect: steam://connect/185.251.226.74:2502' },
      { name: '[ OFFICIAL ] Arma 3 CSLA DM US 03', value: 'IP: 37.10.126.71:2702\nDirect connect: steam://connect/37.10.126.71:2702' },
      { name: '[ OFFICIAL ] Arma 3 CSLA COOP US 03', value: 'IP: 37.10.126.71:2202\nDirect connect: steam://connect/37.10.126.71:2202' },
      { name: '[ OFFICIAL ] Arma 3 CSLA DM AS 02', value: 'IP: 128.0.113.134:2702\nDirect connect: steam://connect/128.0.113.134:2702' },
      { name: '[ OFFICIAL ] Arma 3 CSLA COOP AS 02', value: 'IP: 128.0.113.134:2202\nDirect connect: steam://connect/128.0.113.134:2202' },
      { name: '[ OFFICIAL ] Arma 3 CSLA cDLC Test (EU) #02', value: 'IP: 85.190.150.213:2702\nDirect connect: steam://connect/85.190.150.213:2702\nPassword protected: YES' },
    )
    .setFooter(`All our servers are BattlEye protected!`)
    .setTimestamp()
    message.channel.send(serverEmbed)
}

// chat commands for fun    
  if (message.content.startsWith(prefix + 'ping')) {message.reply(`pong! (${message.createdTimestamp - Date.now()} ms)` );}
  if (message.content.startsWith(prefix + 'neny')) {message.channel.send(`Maroš neny. Možno ističe? 🤔`);}
  if (message.content.startsWith(prefix + 'joke')) {let jokes = Memer.joke(); message.channel.send(jokes)}
  if (message.content.startsWith(prefix + 'chuck')) {let chuck = Memer.chuckNorris(); message.channel.send(chuck)}
  if (message.content.startsWith(prefix + 'compliment')) {let compliment = Memer.copmliment(); message.channel.send(compliment)}
  if (message.content.startsWith(prefix + 'meme')) {
    let meme = Memer.meme()
    let embed = new Discord.MessageEmbed()
    .setTitle(meme.title)
    .setImage(meme.url)
    .setFooter(`Category: ${meme.category}`)
    message.channel.send(embed)
}

// info commands
  if (message.content.startsWith(prefix + 'csla')) {message.channel.send("Get our CDLC and it's depencies from:\n\nCSLA: Iron Curtain (7.5 GB):\n<https://store.steampowered.com/app/1294440/Arma_3_Creator_DLC_CSLA_Iron_Curtain/>\n\nCSLA - Iron Curtain - Campaign (322.754 MB):\n<https://steamcommunity.com/sharedfiles/filedetails/?id=2534376765>\n\nCSLA - Iron Curtain - Operations (421.121 MB):\n<https://steamcommunity.com/sharedfiles/filedetails/?id=2719101174>\n\nCSLA - Iron Curtain - Desert Pack (139.663 MB):\n<https://steamcommunity.com/sharedfiles/filedetails/?id=2687332656>");}
  if (message.content.startsWith(prefix + 'biki')) {message.reply('our biki page is at https://community.bistudio.com/wiki/Category:CSLA:_Iron_Curtain');}
  if (message.content.startsWith(prefix + 'ft')) {message.reply('our Feedback Tracker project is at https://feedback.bistudio.com/project/view/59');}

// auto-replies  
/*    if (message.content.includes('update')) {message.channel.send("The plan is to resolve issues and fix bugs first and then we can devote our time to possible updates. Any updates will first have to be approved by BI.")}
      if (message.content.includes('size')) {message.channel.send("The current size of the CDLC on the disk is 7.5 GB.")}
      if (message.content.includes('interior')) {message.channel.send("All softskin vehicles and APCs/IFVs have full interior. Tanks have 3D viewports modelled to enable full situational awareness.")}
      if (message.content.includes('customizable')) {message.channel.send("Vehicles have multitude of stowage changeable via ArmA3's VhC system and there is multiple color variants for majority of them. Also, emblem/text/roundel/flag changes are possible via attributes in the editor.")}
*/

// admin chat commands
  if (message.content.startsWith(prefix + 'restart')) {
    if (!message.member.hasPermission("ADMINISTRATOR")){message.reply('you cannot do that (missing permission ADMINISTRATOR)! ✋'); return;}
    message.reply('really? Okay then, bye 😭');
    client.destroy();
    client.login(cslaBotToken);
    console.log('Bot restart done');
    client.user.setActivity('CSLA: IC with you');
  }

// ticket management commands
  if (message.content.startsWith(prefix + 'ticket')) {
    var ticketID = Math.floor(Math.random() * 100) + 1;
    const channel = message.guild.channels.create(`ticket: ${ticketID}`);
    message.channel.send("Thank you for contacting our support team! I have created a new ticket for you with this ID: " + "`" + `${ticketID}` + "`");
  }
});

client.on('guildCreate',g => {
    const channel = g.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(g.me).has('SEND_MESSAGES'))
    channel.send("Beep, boop.\n\n Hi, I'm CSLA Bot. :wave::skin-tone-1: I'm an assistant bot at CSLA Studio's Discord (https://discord.gg/jBWHyUWu9D).\n\nI am developed by Lukas Maar (https://github.com/LUKICSLA).")
});

client.on('guildMemberAdd',member => {member.guild.channels.cache.get(welcomeChannelID).send("Welcome on CSLA Studio's Discord " + member.user.tag);});
client.on('guildMemberRemove',member => {member.guild.channels.cache.get(welcomeChannelID).send("Bye " + member.user.tag);});
client.on("ready", () => {console.log(`\n\nLogged in as ${client.user.tag}!\nCopyright © 2022 Lukáš Maár (https://github.com/LUKICSLA)`); client.user.setActivity('CSLA: IC with you');});
client.login(cslaBotToken);