const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Creates a private ticket through which you can communicate directly with us'),
    async execute(interaction) {
        const ticketID = Math.floor(Math.random() * 100000) + 1;

        const modal = new ModalBuilder()
            .setCustomId('ticketModal')
            .setTitle(`Creating ticket T${ticketID}`);

        const messageInput = new TextInputBuilder()
            .setCustomId('messageInput')
            .setLabel("Your message")
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('Hello, I would like to contact you regarding ...')
            .setRequired(true);

        const actionRow = new ActionRowBuilder().addComponents(messageInput);
        modal.addComponents(actionRow);

        await interaction.showModal(modal);

        const filter = (i) => i.customId === 'ticketModal' && i.user.id === interaction.user.id;

        interaction.awaitModalSubmit({ filter, time: 3600000 }) // time limit to submit modal: 60 minutes 
            .then(async (modalInteraction) => {
                const userMessage = modalInteraction.fields.getTextInputValue('messageInput');
                const author = modalInteraction.user;

                try {
                    const channel = await interaction.guild.channels.create({
                        name: `T${ticketID}`,
                        type: ChannelType.GuildText,
                        topic: 'A private ticket through which you can communicate directly with us',
                        parent: '1257705768392724531',
                        permissionOverwrites: [
                            {
                                id: interaction.guild.roles.everyone.id,
                                deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                            },
                            {
                                id: author.id,
                                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                            },
                        ],
                    });

                    await channel.send(`Ticket T\`${ticketID}\` created by ${author}.\n\n**Message:**\n${userMessage}`);

                    await modalInteraction.reply({ content: `Your ticket has been created with ID: \`${ticketID}\``, ephemeral: true });
                } catch (error) {
                    console.error('Error creating ticket:', error);
                    if (!modalInteraction.replied) {
                        await modalInteraction.reply({ content: 'There was an error while creating the ticket. Please try again later.', ephemeral: true });
                    } else {
                        await modalInteraction.followUp({ content: 'There was an error while creating the ticket. Please try again later.', ephemeral: true });
                    }
                }
            })
            .catch(async (error) => {
                console.error('Error waiting for modal submission:', error);
                if (!interaction.replied) {
                    await interaction.reply({ content: 'There was an error while creating the ticket. Please try again later.', ephemeral: true });
                } else {
                    await interaction.followUp({ content: 'There was an error while creating the ticket. Please try again later.', ephemeral: true });
                }
            });
    },
};
