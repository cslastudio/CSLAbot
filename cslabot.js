// Copyright © 2022 Lukáš Maár

const Discord = require('discord.js');
const Memer = require("random-jokes-api");
const { ReactionRoleManager } = require('discord.js-collector');
require('dotenv').config();
const client = new Discord.Client();
const reactionRoleManager = new ReactionRoleManager(client, {storage: false, path: __dirname + '/roles.json', mongoDbLink: '',});

client.on('message',async (message) => {

  // create reaction role command
  if (message.content.startsWith(process.env.CBOT_PREFIX + 'selfRolesEmbed')) {
    message.delete();
    if (!message.member.hasPermission("ADMINISTRATOR")){message.reply('you cannot do that (missing permission: `ADMINISTRATOR`)! ✋'); return;}
    let rolesEmbed = new Discord.MessageEmbed()
      .setColor('#40E0D0')
      .setTitle('Self-assign roles list | Cbot')
      .addFields(
        { name: 'React with 1️⃣', value: 'If you want to **get notifications about __general announcements__.**' },
        { name: 'React with 2️⃣', value: 'If you want to **get notifications about __twitch livestreams__**.' },
        { name: 'React with 3️⃣', value: 'If you want to **hide ENG section**.' },
        { name: 'React with 4️⃣', value: 'If you want to **hide CZ/SK section**.' },
      )
      .setThumbnail('http://kai.rf.gd/images/images.png')
      .setFooter(`Feel free to mention me if you need me or use !help.`)
      .setTimestamp()
    let msg = await message.channel.send(rolesEmbed);
    await msg.react('1️⃣');
    await msg.react('2️⃣');
    await msg.react('3️⃣');
    await msg.react('4️⃣');
    const filter_roles = (reaction, user) => {return reaction.emoji.name === '1️⃣' || reaction.emoji.name === '2️⃣' || reaction.emoji.name === '3️⃣' || reaction.emoji.name === '4️⃣' && user.id === message.author.id && !user.bot;}
    const role_collector = msg.createReactionCollector(filter_roles, {/*time: 30,  max: 1 */});
    role_collector.on('collect', async (reaction) => {
      if (reaction.emoji.name === '1️⃣') reactionRoleManager.createReactionRole({message: msg, roles: ['851867697712594947'], emoji: reaction.emoji.name, type:1});
      if (reaction.emoji.name === '2️⃣') reactionRoleManager.createReactionRole({message: msg, roles: ['851867609624346705'], emoji: reaction.emoji.name, type:1});
      if (reaction.emoji.name === '3️⃣') reactionRoleManager.createReactionRole({message: msg, roles: ['1018945068889018478'], emoji: reaction.emoji.name, type:1});
      if (reaction.emoji.name === '4️⃣') reactionRoleManager.createReactionRole({message: msg, roles: ['1018944529887395870'], emoji: reaction.emoji.name, type:1});
    });
}

// diag and help commands
  if (message.mentions.has(client.user.id)) {
    message.delete();
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    let ping = Math.abs(Date.now() - message.createdTimestamp);
    let aboutEmbed = new Discord.MessageEmbed()
    .setColor("40E0D0")
    .setTitle("About Cbot | CSLA bot")
    .setThumbnail('http://kai.rf.gd/images/images.png')
    .setDescription("*Beep, boop.* Hi, I'm **Cbot**. :wave::skin-tone-1: 😊 I'm an assistant bot at CSLA Studio Discord.")
    .addFields(
      { name: ':bust_in_silhouette: Developer', value: 'Lukáš Maár (Lukyy#4488)', inline: true },
      { name: ':robot: Version', value: '1.0.0', inline: true },
      { name: ':ping_pong: Ping', value: `${ping} ms`, inline: true },
      { name: ':hourglass: Uptime', value: uptime, inline: false },
    )
    .setFooter(`Feel free to mention me if you need me or use !help.`)
    .setTimestamp()
    message.channel.send(aboutEmbed)
}

  if (message.content.startsWith(process.env.CBOT_PREFIX + 'help')) {
    message.delete();
    let helpEmbed = new Discord.MessageEmbed()
    .setColor("40E0D0")
    .setTitle("Command/Feature list | Cbot")
    .setThumbnail('http://kai.rf.gd/images/images.png')
    .setDescription("Here is a list of all Cbot'\s available commands and features.")
    .addFields(
      { name: 'Command List', value: '`!help` - show this list\n`!joke` - get a random joke\n`!chuck` - get a random Chuck Norris joke\n`!compliment` - get a random compliment\n`!meme` - get a random meme image\n`!restart` - restart the bot (CSLA Studio members)\n`!selfRolesEmbed` - generate an embed (CSLA Studio members)\n`!ticket` - create a new support ticket\n`!servers` - list of official servers running with CIC\n`!csla <user>` - show all CIC links\n`!biki <user>` - link to our BI Wiki page\n`!ft <user>` - link to our Feedback Tracker project' },
      { name: '\u200B', value: '\u200B' },
      { name: 'Feature List', value: '* I\'m actively monitoring all text channels\n* Twitch livestream announcements\n* Support management (ticket system)\n* I\'m providing all required links to CIC products' },
    )
    .setFooter(`Feel free to mention me if you need me or use !help.`)
    .setTimestamp()
    message.channel.send(helpEmbed)
}

  if (message.content.startsWith(process.env.CBOT_PREFIX + 'servers')) {
    message.delete();
    let serverEmbed = new Discord.MessageEmbed()
    .setColor("40E0D0")
    .setTitle("Our servers")
    .setThumbnail('https://scontent.fbts6-1.fna.fbcdn.net/v/t1.18169-9/14322438_1303838882960602_6466372646523026116_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=UFXEd-MRUd8AX8y5wCf&_nc_ht=scontent.fbts6-1.fna&oh=00_AT_HMx0gylrW7oGlii2bLAD3t346ghW_hxjXnzvSTnYtjw&oe=6337D6E9')
    .setDescription("Feel free to connect to any of our servers (details below).")
    .addFields(
      { name: ':flag_de: [ OFFICIAL ] Arma 3 CSLA cDLC Test (EU) #02', value: ':desktop: IP: 85.190.150.213:2702\n:link: Direct connect: steam://connect/85.190.150.213:2702\n:lock: Password protected: YES' },
      { name: '\u200B', value: '\u200B' },
      { name: ':flag_de: [ OFFICIAL ] Arma 3 CSLA C&H EU 01', value: ':desktop: IP: 85.190.150.213:2402\n:link: Direct connect: steam://connect/85.190.150.213:2402' },
      { name: ':flag_de: [ OFFICIAL ] Arma 3 CSLA SC EU 01', value: ':desktop: IP: 85.190.150.213:2502\n:link: Direct connect: steam://connect/85.190.150.213:2502' },
      { name: ':flag_de: [ OFFICIAL ] Arma 3 CSLA EndGame EU 01', value: ':desktop: IP: 85.190.155.59:2502\n:link: Direct connect: steam://connect/85.190.155.59:2502' },
      { name: ':flag_de: [ OFFICIAL ] Arma 3 CSLA EndGame EU 02', value: ':desktop: IP: 85.190.158.73:2502\n:link: Direct connect: steam://connect/85.190.158.73:2502' },
      { name: ':flag_de: [ OFFICIAL ] Arma 3 CSLA Warlords EU 01', value: ':desktop: IP: 85.190.155.169:2302\n:link: Direct connect: steam://connect/85.190.155.169:2302' },
      { name: ':flag_de: [ OFFICIAL ] Arma 3 CSLA Warlords EU 02', value: ':desktop: IP: 85.190.155.169:2402\n:link: Direct connect: steam://connect/85.190.155.169:2402' },
      { name: ':flag_de: [ OFFICIAL ] Arma 3 CSLA Warlords EU 03', value: ':desktop: IP: 85.190.155.169:2502\n:link: Direct connect: steam://connect/85.190.155.169:2502' },
      { name: ':flag_de: [ OFFICIAL ] Arma 3 CSLA COOP EU 01', value: ':desktop: IP: 85.190.150.106:2202\n:link: Direct connect: steam://connect/85.190.150.106:2202' },
      { name: ':flag_de: [ OFFICIAL ] Arma 3 CSLA COOP EU 04', value: ':desktop: IP: 109.230.208.231:2202\n:link: Direct connect: steam://connect/109.230.208.231:2202' },
      { name: ':flag_de: [ OFFICIAL ] Arma 3 CSLA DM EU 01', value: ':desktop: IP: 85.190.150.106:2702\n:link: Direct connect: steam://connect/85.190.150.106:2702' },
      { name: ':flag_de: [ OFFICIAL ] Arma 3 CSLA DM EU 04', value: ':desktop: IP: 109.230.208.231:2702\n:link: Direct connect: steam://connect/109.230.208.231:2702' },
      { name: ':flag_gb: [ OFFICIAL ] Arma 3 CSLA Zeus UK 01', value: ':desktop: IP: 185.251.226.74:2302\n:link: Direct connect: steam://connect/185.251.226.74:2302' },
      { name: ':flag_gb: [ OFFICIAL ] Arma 3 CSLA Combat Patrol UK 01', value: ':desktop: IP: 185.251.226.74:2402\n:link: Direct connect: steam://connect/185.251.226.74:2402' },
      { name: ':flag_gb: [ OFFICIAL ] Arma 3 CSLA Combat Patrol UK 02', value: ':desktop: IP: 185.251.226.74:2502\n:link: Direct connect: steam://connect/185.251.226.74:2502' },
      { name: ':flag_us: [ OFFICIAL ] Arma 3 CSLA DM US 03', value: ':desktop: IP: 37.10.126.71:2702\n:link: Direct connect: steam://connect/37.10.126.71:2702' },
      { name: ':flag_us: [ OFFICIAL ] Arma 3 CSLA COOP US 03', value: ':desktop: IP: 37.10.126.71:2202\n:link: Direct connect: steam://connect/37.10.126.71:2202' },
      { name: ':flag_sg: [ OFFICIAL ] Arma 3 CSLA DM AS 02', value: ':desktop: IP: 128.0.113.134:2702\n:link: Direct connect: steam://connect/128.0.113.134:2702' },
      { name: ':flag_sg: [ OFFICIAL ] Arma 3 CSLA COOP AS 02', value: ':desktop: IP: 128.0.113.134:2202\n:link: Direct connect: steam://connect/128.0.113.134:2202' },
    )
    .setFooter(`All our servers are BattlEye protected!`)
    .setTimestamp()
    message.channel.send(serverEmbed)
}

// image only channel(s) setup
  if (message.attachments.size == 0 && message.channel.id == process.env.IMG_ONLY_CHANNEL_ID) {
    if (message.author.bot) return false;
    if (message.attachments.size == 0) message.delete();
    message.channel.send("This is an image-only channel!").then(msg => {msg.delete({timeout: 20000});});
}

// chat commands for fun
  if (message.content.startsWith(process.env.CBOT_PREFIX + 'joke')) {message.delete(); let jokes = Memer.joke(); message.channel.send(jokes)}
  if (message.content.startsWith(process.env.CBOT_PREFIX + 'chuck')) {message.delete(); let chuck = Memer.chuckNorris(); message.channel.send(chuck)}
  if (message.content.startsWith(process.env.CBOT_PREFIX + 'compliment')) {message.delete(); let compliment = Memer.copmliment(); message.channel.send(compliment)}
  if (message.content.startsWith(process.env.CBOT_PREFIX + 'meme')) {
    message.delete();
    let meme = Memer.meme()
    let embed = new Discord.MessageEmbed()
    .setTitle(meme.title)
    .setImage(meme.url)
    .setFooter(`Category: ${meme.category}`)
    message.channel.send(embed)
}

// info commands
  if (message.content.startsWith(process.env.CBOT_PREFIX + 'csla')) {
    message.delete();
    let member = message.mentions.members.first();
    if (!member) return message.reply('missing argument `user` (e.g.: `!csla @Lukyy`).');
    let cslaEmbed = new Discord.MessageEmbed()
    .setColor("40E0D0")
    .setTitle("CSLA: IC and packs | Cbot")
    .setThumbnail('https://scontent.fbts6-1.fna.fbcdn.net/v/t1.18169-9/14322438_1303838882960602_6466372646523026116_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=UFXEd-MRUd8AX8y5wCf&_nc_ht=scontent.fbts6-1.fna&oh=00_AT_HMx0gylrW7oGlii2bLAD3t346ghW_hxjXnzvSTnYtjw&oe=6337D6E9')
    .setDescription(`${member}` + ', here is a list of all our products.')
    .addFields(
      { name: 'Arma 3 Creator DLC: CSLA Iron Curtain', value: 'Size: 7.5 GB\nPrice: 12,99€\nLink: [Steam Store](https://store.steampowered.com/app/1294440/Arma_3_Creator_DLC_CSLA_Iron_Curtain/)' },
      { name: 'CSLA - Iron Curtain - Compatibility Data for Non-Owners', value: 'Size: 3.5 GB\nLink: [Steam Workshop](https://steamcommunity.com/sharedfiles/filedetails/?id=2503886780)' },
      { name: 'CSLA - Iron Curtain - Desert Pack', value: 'Size: 139.663 MB\nLink: [Steam Workshop](https://steamcommunity.com/sharedfiles/filedetails/?id=2687332656)' },
      { name: 'CSLA - Iron Curtain - Campaign', value: 'Size: 322.754 MB\nLink: [Steam Workshop](https://steamcommunity.com/sharedfiles/filedetails/?id=2534376765)' },
      { name: 'CSLA - Iron Curtain - Operations', value: 'Size: 421.121 MB\nLink: [Steam Workshop](https://steamcommunity.com/sharedfiles/filedetails/?id=2719101174)' },
    )
    .setFooter(`Feel free to mention me if you need me or use !help.`)
    .setTimestamp()
    message.channel.send(cslaEmbed)
}

  if (message.content.startsWith(process.env.CBOT_PREFIX + 'biki')) {
    let member = message.mentions.members.first();
    if (!member) return message.reply('missing argument `user` (e.g.: `!biki @Lukyy`).'); message.delete(); message.channel.send('Hey' + `${member}` + ', our biki page is at https://community.bistudio.com/wiki/Category:CSLA:_Iron_Curtain');
  }

  if (message.content.startsWith(process.env.CBOT_PREFIX + 'ft')) {
    let member = message.mentions.members.first();
    if (!member) return message.reply('missing argument `user` (e.g.: `!ft @Lukyy`).'); message.delete(); message.channel.send('Hey' + `${member}` + ', our Feedback Tracker project is at https://feedback.bistudio.com/project/view/59');
  }

// auto-replies  
/*    if (message.content.includes('update')) {message.channel.send("The plan is to resolve issues and fix bugs first and then we can devote our time to possible updates. Any updates will first have to be approved by BI.")}
      if (message.content.includes('size')) {message.channel.send("The current size of the CDLC on the disk is 7.5 GB.")}
      if (message.content.includes('interior')) {message.channel.send("All softskin vehicles and APCs/IFVs have full interior. Tanks have 3D viewports modelled to enable full situational awareness.")}
      if (message.content.includes('customizable')) {message.channel.send("Vehicles have multitude of stowage changeable via ArmA3's VhC system and there is multiple color variants for majority of them. Also, emblem/text/roundel/flag changes are possible via attributes in the editor.")} */

// admin chat commands
  if (message.content.startsWith(process.env.CBOT_PREFIX + 'restart')) {
    message.delete();
    if (!message.member.hasPermission("ADMINISTRATOR")){message.reply('you cannot do that (missing permission: `ADMINISTRATOR`)! ✋'); return;}
    message.reply('really? Okay then, bye 😭');
    client.destroy();
    client.login(process.env.CBOT_TOKEN);
    console.log('Bot restart done');
    client.user.setActivity('CSLA: Iron Curtain');
}

// ticket management commands
  if (message.content.startsWith(process.env.CBOT_PREFIX + 'ticket')) {
    var ticketID = Math.floor(Math.random() * 100) + 1;
    message.react('<:cslastudio:847143632922345520>');
    message.guild.channels.create(`ticket: ${ticketID}`,
    {
      type: 'text',
      topic: `Your dedicated space to communicate with CSLA Studio members.`,
      permissionOverwrites: [
      {
          id: message.guild.roles.everyone,
          deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
      },
      {
        id: message.author,
        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
      }
     ],
    }).then(
    channel => {
      channel.send(`Thank you for contacting <@&${process.env.SUPPORT_ROLE_ID}> members, we'll be with you shortly!`).then(
      msg => {
        msg.react('🗑️');
        const filter_actions = (reaction, user) => {return reaction.emoji.name === '🗑️' && user.id === message.author.id && !user.bot;}
        const actions_collector = msg.createReactionCollector(filter_actions, {max: 1});
        actions_collector.on('collect', async (reaction) => {if (reaction.emoji.name === '🗑️' && msg.member.hasPermission("ADMINISTRATOR")) channel.delete();});
      })
    channel.setParent('853742753271119913');
    });
    message.channel.send("Thank you for contacting CSLA Studio members! I have created a new ticket for you with this ID: " + "`" + `${ticketID}` + "`").then(msg => msg.delete({timeout: 20000}))
    message.delete({timeout: 20000});
}});

if(process.env.WELCOME_MSG_NOTIFICATION  == 'TRUE') {
  client.on('guildCreate',g => {
    const channel = g.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(g.me).has('SEND_MESSAGES'))
    channel.send("Beep, boop.\n\n Hi, I'm CSLA Bot. :wave::skin-tone-1: I'm an assistant bot at CSLA Studio's Discord (https://discord.gg/jBWHyUWu9D).\n\nI am developed by Lukas Maar (https://github.com/LUKICSLA).")
  });
  client.on('guildMemberAdd',member => {member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID).send("Welcome on CSLA Studio's Discord " + member.user.tag + " 👋🏻");});
  client.on('guildMemberRemove',member => {member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID).send("Bye " + member.user.tag + " 😭");});
}

client.on("ready", () => {console.log(`\n\nLogged in as ${client.user.tag}!\nCopyright © 2022 Lukáš Maár (https://github.com/LUKICSLA)`); client.user.setActivity('CSLA: Iron Curtain');});
client.login(process.env.CBOT_TOKEN);