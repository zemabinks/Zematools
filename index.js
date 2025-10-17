import { Client, GatewayIntentBits, Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, InteractionType } from 'discord.js';
import express from 'express';
import 'dotenv/config';

// =====================
// Discord Bot Setup
// =====================
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// =====================
// Ready Event
// =====================
client.once(Events.ClientReady, c => {
  console.log(`🤖 Logged in as ${c.user.tag}`);
});

// =====================
// Interaction Handler
// =====================
client.on(Events.InteractionCreate, async interaction => {
  if (interaction.type === InteractionType.ApplicationCommand) {

    // ----- /zematools -----
    if (interaction.commandName === 'zematools') {
      const embed = new EmbedBuilder()
        .setTitle('🎉 ZemaTools just got even better!')
        .setURL('https://zematools.iceiy.com/')
        .setDescription(
          '✅ Complete SBCs faster\n🎁 Complete them cheaper\n\n💾 Download [ZemaTools](https://zematools.iceiy.com/) and [AutoSBC](https://autosbc.app/userscript/autosbc.user.js)'
        )
        .setColor(2093311);

      const row1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel('ZemaTools Website')
          .setStyle(ButtonStyle.Link)
          .setURL('https://zematools.iceiy.com/'),
        new ButtonBuilder()
          .setLabel('ZemaTools Website BACKUP')
          .setStyle(ButtonStyle.Link)
          .setURL('https://zematools.netlify.app/')
      );

      await interaction.reply({
        content: '🚀 ZemaTools FC26 🚀',
        embeds: [embed],
        components: [row1]
      });
    }

    // ----- /active-dev-badge -----
    if (interaction.commandName === 'active-dev-badge') {
      const embed = new EmbedBuilder()
        .setTitle('🤖 Command Ran Successfully')
        .setDescription(
          `You have successfully executed the command to get the **Active** \n**Developer Badge**!\n\nAfter Discord processes the execution of the command, **you** will \nbe able to claim the badge by pressing the button below. Please \nnote that Discord may take up to **24 hours** to process your \neligibility.`
        )
        .setColor(5784319)
        .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8aMugg7LWDXqkWc-9JlApM4MLPXhi-EPDYA&s');

      const row1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel('⌛ Check Status')
          .setStyle(ButtonStyle.Link)
          .setURL('https://discord.com/developers/active-developer')
      );

      await interaction.reply({
        embeds: [embed],
        components: [row1],
        ephemeral: true
      });
    }

    // ----- /launchzematools -----
    if (interaction.commandName === 'launchzematools') {
      const embed = new EmbedBuilder()
        .setTitle('🚀 Launch ZemaTools')
        .setDescription('Click the button below to open ZemaTools in your browser!')
        .setColor(0x1abc9c);

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel('Open ZemaTools')
          .setStyle(ButtonStyle.Link)
          .setURL('https://zematools.onrender.com/')
      );

      await interaction.reply({
        embeds: [embed],
        components: [row],
        ephemeral: true
      });
    }
  }
});

// =====================
// Log in
// =====================
client.login(process.env.DISCORD_TOKEN);

// =====================
// Tiny Web Server for Render Web Service
// =====================
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot is running!');
});

app.listen(PORT, () => {
  console.log(`✅ Web server running on port ${PORT}`);
});
