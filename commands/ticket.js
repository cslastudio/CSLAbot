const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Creates a private ticket through which you can communicate directly with us'),
    async execute(interaction) {
        const ticketID = Math.floor(Math.random() * 100000) + 1;

        try {
            await interaction.reply({ content: `Thank you for reaching us, I have created a new ticket for you with this ID: \`${ticketID}\``, ephemeral: true });

            const channel = await interaction.guild.channels.create({
                name: `T${ticketID}`,
                type: ChannelType.GuildText,
                topic: 'A private ticket through which you can communicate directly with us',
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

            await channel.send(`Thank you for reaching us, we'll be with you shortly!`);
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
