const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const Memer = require("random-jokes-api");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('biki')
        .setDescription('Provide a link to CSLA Iron Curtain BIKI'),
    async execute(interaction) {interaction.reply('Our biki page is at https://community.bistudio.com/wiki/Category:CSLA:_Iron_Curtain')},
};