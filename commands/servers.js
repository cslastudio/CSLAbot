const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('servers')
        .setDescription('List of official servers running with CIC'),
        async execute(interaction) {
            let embed = new EmbedBuilder()
            .setColor("40E0D0")
            .setTitle("Our servers")
            .setThumbnail('https://scontent.fbts6-1.fna.fbcdn.net/v/t1.18169-9/14322438_1303838882960602_6466372646523026116_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=UFXEd-MRUd8AX8y5wCf&_nc_ht=scontent.fbts6-1.fna&oh=00_AT_HMx0gylrW7oGlii2bLAD3t346ghW_hxjXnzvSTnYtjw&oe=6337D6E9')
            .setDescription("Feel free to connect to any of our servers (details below).")
            .addFields(
                { name: ':flag_eu: [ OFFICIAL ] Arma 3 CSLA cDLC Test (EU) #02', value: ':desktop: IP: 85.190.150.213:2702\n:link: Direct connect: steam://connect/85.190.150.213:2702\n:lock: Password protected: YES' },
                { name: '\u200B', value: '\u200B' },
                { name: ':flag_eu: [ OFFICIAL ] Arma 3 CSLA C&H EU 01', value: ':desktop: IP: 85.190.150.213:2402\n:link: Direct connect: steam://connect/85.190.150.213:2402' },
                { name: ':flag_eu: [ OFFICIAL ] Arma 3 CSLA SC EU 01', value: ':desktop: IP: 85.190.150.213:2502\n:link: Direct connect: steam://connect/85.190.150.213:2502' },
                { name: ':flag_eu: [ OFFICIAL ] Arma 3 CSLA EndGame EU 01', value: ':desktop: IP: 85.190.155.59:2502\n:link: Direct connect: steam://connect/85.190.155.59:2502' },
                { name: ':flag_eu: [ OFFICIAL ] Arma 3 CSLA EndGame EU 02', value: ':desktop: IP: 85.190.158.73:2502\n:link: Direct connect: steam://connect/85.190.158.73:2502' },
                { name: ':flag_eu: [ OFFICIAL ] Arma 3 CSLA Warlords EU 01', value: ':desktop: IP: 85.190.155.169:2302\n:link: Direct connect: steam://connect/85.190.155.169:2302' },
                { name: ':flag_eu: [ OFFICIAL ] Arma 3 CSLA Warlords EU 02', value: ':desktop: IP: 85.190.155.169:2402\n:link: Direct connect: steam://connect/85.190.155.169:2402' },
                { name: ':flag_eu: [ OFFICIAL ] Arma 3 CSLA Warlords EU 03', value: ':desktop: IP: 85.190.155.169:2502\n:link: Direct connect: steam://connect/85.190.155.169:2502' },
                { name: ':flag_eu: [ OFFICIAL ] [ OFFICIAL ] Arma 3 CSLA COOP EU 01', value: ':desktop: IP: 85.190.150.106:2202\n:link: Direct connect: steam://connect/85.190.150.106:2202' },
                { name: ':flag_eu: [ OFFICIAL ] Arma 3 CSLA COOP EU 04', value: ':desktop: IP: 109.230.208.231:2202\n:link: Direct connect: steam://connect/109.230.208.231:2202' },
                { name: ':flag_eu: [ OFFICIAL ] Arma 3 CSLA DM EU 01', value: ':desktop: IP: 85.190.150.106:2702\n:link: Direct connect: steam://connect/85.190.150.106:2702' },
                { name: ':flag_eu: [ OFFICIAL ] Arma 3 CSLA DM EU 04', value: ':desktop: IP: 109.230.208.231:2702\n:link: Direct connect: steam://connect/109.230.208.231:2702' },
                { name: ':flag_gb: [ OFFICIAL ] Arma 3 CSLA Zeus UK 01', value: ':desktop: IP: 185.251.226.74:2302\n:link: Direct connect: steam://connect/185.251.226.74:2302' },
                { name: ':flag_gb: [ OFFICIAL ] Arma 3 CSLA Combat Patrol UK 01', value: ':desktop: IP: 185.251.226.74:2402\n:link: Direct connect: steam://connect/185.251.226.74:2402' },
                { name: ':flag_gb: [ OFFICIAL ] Arma 3 CSLA Combat Patrol UK 02', value: ':desktop: IP: 185.251.226.74:2502\n:link: Direct connect: steam://connect/185.251.226.74:2502' },
                { name: ':flag_us: [ OFFICIAL ] Arma 3 CSLA DM US 03', value: ':desktop: IP: 37.10.126.71:2702\n:link: Direct connect: steam://connect/37.10.126.71:2702' },
                { name: ':flag_us: [ OFFICIAL ] Arma 3 CSLA COOP US 03', value: ':desktop: IP: 37.10.126.71:2202\n:link: Direct connect: steam://connect/37.10.126.71:2202' },
                { name: ':flag_sg: [ OFFICIAL ] Arma 3 CSLA DM AS 02', value: ':desktop: IP: 128.0.113.134:2702\n:link: Direct connect: steam://connect/128.0.113.134:2702' },
                { name: ':flag_sg: [ OFFICIAL ] Arma 3 CSLA COOP AS 02', value: ':desktop: IP: 128.0.113.134:2202\n:link: Direct connect: steam://connect/128.0.113.134:2202' },
              )
              .setFooter({ text: 'All our servers are BattlEye protected!' })
              .setTimestamp()
            interaction.reply({ embeds: [embed] })
    },
};