const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');
const express = require('express');

const app = express();
app.get('/', (req, res) => res.send('Bot leeft!'));
app.listen(3000);

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', () => {
  console.log('Bot is online!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ticket') {
    const channel = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.username}`,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: interaction.user.id,
          allow: [PermissionsBitField.Flags.ViewChannel],
        },
      ],
    });

    await interaction.reply({ content: `Ticket gemaakt: ${channel}`, ephemeral: true });
  }
});

client.login(process.env.TOKEN);
