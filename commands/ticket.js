const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Creates a new support ticket'),
    async execute(interaction) {
        const ticketID = Math.floor(Math.random() * 100000) + 1;

        try {
            await interaction.reply({ content: `Thank you for contacting our Support team! I have created a new ticket for you with this ID: \`${ticketID}\``, ephemeral: true });

            const channel = await interaction.guild.channels.create({
                name: `T${ticketID}`,
                type: ChannelType.GuildText,
                topic: 'Your dedicated space to communicate with our Support team.',
                parent: '1257701693949476997',
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone.id,
                        deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                    },
                    {
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                    },
                ],
            });

            await channel.send(`Thank you for contacting <@&${process.env.SUPPORT_ROLE_ID}> team, we'll be with you shortly!`);
        } catch (error) {
            console.error('Error creating ticket:', error);
            if (!interaction.replied) {
                await interaction.reply({ content: 'There was an error while creating the ticket. Please try again later.', ephemeral: true });
            } else {
                await interaction.followUp({ content: 'There was an error while creating the ticket. Please try again later.', ephemeral: true });
            }
        }
    },
};
