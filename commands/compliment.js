const { SlashCommandBuilder } = require('discord.js');
const Memer = require("random-jokes-api");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('compliment')
        .setDescription('Send a random compliment'),
    async execute(interaction) {
        let compliment = Memer.copmliment();
        interaction.reply({content: compliment, ephemeral: true});
    },
};