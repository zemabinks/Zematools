import { Client, GatewayIntentBits, Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import express from 'express';
import 'dotenv/config';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// =====================
// Discord bot
// =====================
client.once(Events.ClientReady, c => {
  console.log(`🤖 Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'zematools') {
    // Embed
    const embed = new EmbedBuilder()
      .setTitle('🎉 ZemaTools just got even better!')
      .setURL('https://zematools.iceiy.com/')
      .setDescription(
        '✅ Complete SBCs faster\n🎁 Complete them cheaper\n\n💾 Download [ZemaTools](https://zematools.iceiy.com/) and [AutoSBC](https://autosbc.app/userscript/autosbc.user.js)'
      )
      .setColor(2093311);

    // Buttons
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
});

// Log in to Discord
client.login(process.env.DISCORD_TOKEN);

// =====================
// Tiny web server for Render Web Service
// =====================
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot is running!');
});

app.listen(PORT, () => {
  console.log(`✅ Web server running on port ${PORT}`);
});
