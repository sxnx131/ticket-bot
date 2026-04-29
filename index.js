const { 
  Client, 
  GatewayIntentBits, 
  PermissionsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

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

  // BUTTON KLIK
  if (interaction.isButton()) {
    if (interaction.customId === 'create_ticket') {

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

      await channel.send(`Welkom ${interaction.user} 🎫`);
      await interaction.reply({ content: `Je ticket: ${channel}`, ephemeral: true });
    }
  }

  // COMMAND OM KNOP TE PLAATSEN
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'panel') {

      const button = new ButtonBuilder()
        .setCustomId('create_ticket')
        .setLabel('🎫 Maak ticket')
        .setStyle(ButtonStyle.Primary);

      const row = new ActionRowBuilder().addComponents(button);

      await interaction.reply({
        content: 'Klik hieronder om een ticket te maken:',
        components: [row]
      });
    }
  }
});

client.login(process.env.TOKEN);
