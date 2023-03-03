const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken('MTA0MDY1NjM1NTgwOTMwMDU5MQ.Gsnqfm.mJWfnVoD2R7RRr0ua_S7brn6Jbpbm6ujdeim50');
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        const data = await rest.put(
            Routes.applicationGuildCommands("1014871581371158528","570999437728546852"),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {console.error(error);}
})();