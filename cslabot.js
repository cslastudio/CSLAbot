require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  ActivityType,
} = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
  console.log(
    `\n\nLogged in as ${client.user.tag}!\nCopyright © 2022-2023 Lukáš Maár (https://github.com/LUKICSLA)`
  );
  client.user.setPresence({
    activities: [{ name: `chat`, type: ActivityType.Watching }],
    status: "online",
  });
});

client.on("threadCreate", (thread) => {
  if (
    thread.parent.name === "bugreport" ||
    thread.parent.name === "bugreport_eng"
  ) {
    thread.send(
      "Hello and thanks for reporting - your report has been logged, and we will look into it. If we require more information we will contact you here in the thread."
    );
  }
});

client.on("message", (message) => {
  // image only channel(s) setup
  if (
    message.attachments.size == 0 &&
    message.channel.id == "852283174523502642"
  ) {
    //if (message.author.bot) return false;
    if (message.attachments.size == 0) {
      message.delete();
    }
    message.channel
      .send(
        "This is a channel for posting community images only. Please avoid unnecessary discussion in this channel and use the **media_discussion** channel as we want to ensure that this channel remains clear. Thank you."
      )
      .then((msg) => {
        msg.delete({ timeout: 10000 });
      });
  }

  if (message.content.startsWith(process.env.CBOT_PREFIX + "restart")) {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      message.reply(
        "you cannot do that (missing permission ADMINISTRATOR)! ✋"
      );
      return;
    }
    message.reply("really? Okay then, bye 😭");
    client.destroy();
    client.login(process.env.CBOT_TOKEN);
    console.log("Bot restart done");
    client.user.setPresence({
      activities: [{ name: `chat`, type: ActivityType.Watching }],
      status: "dnd",
    });
  }

  if (message.content.startsWith(process.env.CBOT_PREFIX + "ticket")) {
    var ticketID = Math.floor(Math.random() * 100) + 1;
    message.react("<:cslastudio:847143632922345520>");
    message.guild.channels
      .create(`ticket: ${ticketID}`, {
        type: "text",
        topic: `Your dedicated space to communicate with our Support team.`,
        permissionOverwrites: [
          {
            id: message.guild.roles.everyone,
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"],
          },
          {
            id: message.author,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
          },
        ],
      })
      .then((channel) =>
        channel.send(
          `Thank you for contacting <@&${process.env.SUPPORT_ROLE_ID}> team, we'll be with you shortly!`
        )
      );
    message.channel
      .send(
        "Thank you for contacting our Support team! I have created a new ticket for you with this ID: " +
          "`" +
          `${ticketID}` +
          "`"
      )
      .then((msg) => msg.delete({ timeout: 20000 }));
    message.delete({ timeout: 20000 });
  }

  if (process.env.WELCOME_MSG_NOTIFICATION == "TRUE") {
    client.on("guildCreate", (g) => {
      const channel = g.channels.cache.find(
        (channel) =>
          channel.type === "GUILD_TEXT" &&
          channel.permissionsFor(g.me).has("SEND_MESSAGES")
      );
      channel.send(
        "Beep, boop.\n\n Hi, I'm CSLA Bot. :wave::skin-tone-1: I'm an assistant bot at CSLA Studio's Discord (https://discord.gg/jBWHyUWu9D).\n\nI am developed by Lukas Maar (https://github.com/LUKICSLA)."
      );
    });
    client.on("guildMemberAdd", (member) => {
      member.guild.channels.cache
        .get(process.env.WELCOME_CHANNEL_ID)
        .send("Welcome on CSLA Studio's Discord " + member.user.tag + " 👋🏻");
    });
    client.on("guildMemberRemove", (member) => {
      member.guild.channels.cache
        .get(process.env.WELCOME_CHANNEL_ID)
        .send("Bye " + member.user.tag + " 😭");
    });
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.customId === "select") {
    const member = interaction.member;
    for (const selOption of interaction.values) {
      if (selOption.includes("twitchan")) {
        // 851867609624346705
        member.roles.add("851867609624346705");
      }
      if (selOption.includes("genan")) {
        // 851867697712594947
        member.roles.add("851867697712594947");
      }
      if (selOption.includes("hide_eng")) {
        // 1018945068889018478
        member.roles.add("1018945068889018478");
      }
      if (selOption.includes("hide_czsk")) {
        // 1018944529887395870
        member.roles.add("1018944529887395870");
      }
    }
    await interaction.reply({
      content: "I have successfully updated your roles 😊",
      ephemeral: true,
    });
  }

  //if (!interaction.isButton()) return;
  if (interaction.isButton()) {
    const member = interaction.member;
    if (member.roles.cache.has("851867609624346705")) {
      member.roles.remove("851867609624346705");
    }
    if (member.roles.cache.has("851867697712594947")) {
      member.roles.remove("851867697712594947");
    }
    if (member.roles.cache.has("1018945068889018478")) {
      member.roles.remove("1018945068889018478");
    }
    if (member.roles.cache.has("1018944529887395870")) {
      member.roles.remove("1018944529887395870");
    }
    await interaction.reply({
      content: "I have successfully updated your roles 😊",
      ephemeral: true,
    });
  }

  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(process.env.CBOT_TOKEN);