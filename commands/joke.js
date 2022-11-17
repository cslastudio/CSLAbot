const { SlashCommandBuilder } = require('discord.js');
const Memer = require("random-jokes-api");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Send a random joke'),
    async execute(interaction) {
        let joke = Memer.joke();
        interaction.reply({content: joke, ephemeral: true});
    },
};