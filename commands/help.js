const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Provides help'),
    async execute(interaction) {interaction.reply("If you need to check the list of available commands for Cbot start typing with `/` at the beginning, and if you need to contact us privately don't hesitate to contact us here on Discord via ticket using the `/ticket` command.")},
};
