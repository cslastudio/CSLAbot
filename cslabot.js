const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) 
{
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {console.log(`\n\nLogged in as ${client.user.tag}!\nCopyright © 2022 Lukáš Maár (https://github.com/LUKICSLA)`); client.user.setActivity('CSLA: Iron Curtain');});

client.on('message',message => {
// image only channel(s) setup
if (message.attachments.size == 0 && message.channel.id == process.env.IMG_ONLY_CHANNEL_ID) {
  if (message.author.bot) return false;
  if (message.attachments.size == 0) message.delete();
  message.channel.send("This is an image-only channel!").then(msg => {msg.delete({timeout: 10000});});
}

if (message.content.startsWith(process.env.CBOT_PREFIX + 'restart')) {
  if (!message.member.hasPermission("ADMINISTRATOR")){message.reply('you cannot do that (missing permission ADMINISTRATOR)! ✋'); return;}
  message.reply('really? Okay then, bye 😭');
  client.destroy();
  client.login(process.env.CBOT_TOKEN);
  console.log('Bot restart done');
  client.user.setActivity('CSLA: Iron Curtain');
}

if (message.content.startsWith(process.env.CBOT_PREFIX + 'ticket')) {
  var ticketID = Math.floor(Math.random() * 100) + 1;
  message.react('<:cslastudio:847143632922345520>');
  message.guild.channels.create(`ticket: ${ticketID}`,
  {
    type: 'text',
    topic: `Your dedicated space to communicate with our Support team.`,
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
  }).then(channel => channel.send(`Thank you for contacting <@&${process.env.SUPPORT_ROLE_ID}> team, we'll be with you shortly!`));
  message.channel.send("Thank you for contacting our Support team! I have created a new ticket for you with this ID: " + "`" + `${ticketID}` + "`").then(msg => msg.delete({timeout: 20000}))
  message.delete({timeout: 20000});
};

if(process.env.WELCOME_MSG_NOTIFICATION  == 'TRUE') {
  client.on('guildCreate',g => {
    const channel = g.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(g.me).has('SEND_MESSAGES'))
    channel.send("Beep, boop.\n\n Hi, I'm CSLA Bot. :wave::skin-tone-1: I'm an assistant bot at CSLA Studio's Discord (https://discord.gg/jBWHyUWu9D).\n\nI am developed by Lukas Maar (https://github.com/LUKICSLA).")
  });
  client.on('guildMemberAdd',member => {member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID).send("Welcome on CSLA Studio's Discord " + member.user.tag + " 👋🏻");});
  client.on('guildMemberRemove',member => {member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID).send("Bye " + member.user.tag + " 😭");});
  }
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try 
  {
		await command.execute(interaction);
	} 
  catch (error) 
  {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login("MTAxNDg3MTU4MTM3MTE1ODUyOA.GtYv4_.GO2YCa46XcGWVoNHD_AFXLfOY-UB5rceKTYq_Y");