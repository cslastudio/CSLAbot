const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const Memer = require("random-jokes-api");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('csla')
        .setDescription('Show all CIC related links'),
    async execute(interaction) {
        let embed = new EmbedBuilder()
        .setTitle("CSLA: IC and packs | Cbot")
        .setThumbnail('https://scontent.fbts6-1.fna.fbcdn.net/v/t1.18169-9/14322438_1303838882960602_6466372646523026116_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=UFXEd-MRUd8AX8y5wCf&_nc_ht=scontent.fbts6-1.fna&oh=00_AT_HMx0gylrW7oGlii2bLAD3t346ghW_hxjXnzvSTnYtjw&oe=6337D6E9')
        .setDescription("Here is a list of all our products.")
        .addFields(
          { name: 'Arma 3 Creator DLC: CSLA Iron Curtain', value: 'Size: 7.5 GB\nPrice: 12,99€\nLink: [Steam Store](https://store.steampowered.com/app/1294440/Arma_3_Creator_DLC_CSLA_Iron_Curtain/)' },
          { name: 'CSLA - Iron Curtain - Compatibility Data for Non-Owners', value: 'Size: 3.5 GB\nLink: [Steam Workshop](https://steamcommunity.com/sharedfiles/filedetails/?id=2503886780)' },
          { name: 'CSLA - Iron Curtain - Desert Pack', value: 'Size: 139.663 MB\nLink: [Steam Workshop](https://steamcommunity.com/sharedfiles/filedetails/?id=2687332656)' },
          { name: 'CSLA - Iron Curtain - Campaign', value: 'Size: 322.754 MB\nLink: [Steam Workshop](https://steamcommunity.com/sharedfiles/filedetails/?id=2534376765)' },
          { name: 'CSLA - Iron Curtain - Operations', value: 'Size: 421.121 MB\nLink: [Steam Workshop](https://steamcommunity.com/sharedfiles/filedetails/?id=2719101174)' },
        )
        .setFooter({ text: 'Feel free to mention me if you need me' })
        .setTimestamp()
        interaction.reply({ embeds: [embed] })
    },
};