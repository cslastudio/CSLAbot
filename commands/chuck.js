const { SlashCommandBuilder } = require('discord.js');
const Memer = require("random-jokes-api");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chuck')
        .setDescription('Send a random Chuck Norris joke'),
    async execute(interaction) {
        let chuck = Memer.chuckNorris();
        interaction.reply({content: chuck, ephemeral: true});
    },
};