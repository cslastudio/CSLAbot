const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check if Cbot is alive'),
    async execute(interaction) {interaction.reply("Pong")},
};