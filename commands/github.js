const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('github')
        .setDescription('Provide a link to CSLA Studio\'s GitHub'),
    async execute(interaction) {interaction.reply('You can follow us or access our public repositories at https://github.com/cslastudio')},
};
