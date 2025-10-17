import express from 'express'; // install with `npm install express`
import { Client, GatewayIntentBits, Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import 'dotenv/config';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
  console.log(`🤖 Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'zematools') {
    const embed = new EmbedBuilder()
      .setTitle('🎉 ZemaTools just got even better!')
      .setURL('https://docs.tomatenkuchen.com/messageeditor')
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
        .setURL('https://tomatenkuchen.com')
    );

    await interaction.reply({
      content: '🚀 ZemaTools FC26 🚀',
      embeds: [embed],
      components: [row1]
    });
  }
});

client.login(process.env.DISCORD_TOKEN);

// =====================
// Tiny web server for Render
// =====================
const app = express();
const PORT = process.env.PORT || 3000; // Render sets the PORT automatically

app.get('/', (req, res) => {
  res.send('Bot is running!');
});

app.listen(PORT, () => {
  console.log(`✅ Web server running on port ${PORT}`);
});
