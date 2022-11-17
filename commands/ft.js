const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const Memer = require("random-jokes-api");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ft')
        .setDescription('Provide a link to CSLA Iron Curtain FT project'),
    async execute(interaction) {interaction.reply('Our Feedback Tracker project is at https://feedback.bistudio.com/project/view/59')},
};