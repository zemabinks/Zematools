import { Client, GatewayIntentBits, Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } from 'discord.js';
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
  if (!interaction.isChatInputCommand()) return;

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
      .setTitle('🎖️ How to Claim Your Active Developer Badge')
      .setDescription(`
1️⃣ Run a command with your bot in any server.  
2️⃣ Enable "Use data to improve Discord" in [Privacy & Safety Settings](https://discord.com/settings/privacy).  
3️⃣ Set up a Community Server for your bot in the [Developer Portal](https://discord.com/developers/applications).  
4️⃣ Select a Developer News Channel in your Community Server.  
5️⃣ Visit the [Active Developer Badge page](https://discord.com/developers/active-developer) and claim your badge.
      `)
      .setColor(0x00AE86);

    await interaction.reply({ embeds: [embed] });
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

// =====================
// Slash Command Registration
// =====================
import { REST, Routes } from 'discord.js';

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
const commands = [
  new SlashCommandBuilder()
    .setName('zematools')
    .setDescription('Sends the ZemaTools message with embed and buttons')
    .toJSON(),
  new SlashCommandBuilder()
    .setName('active-dev-badge')
    .setDescription('Guides you through claiming the Active Developer Badge on Discord')
    .toJSON()
];

(async () => {
  try {
    console.log('⏳ Registering slash commands...');
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
    console.log('✅ Slash commands registered successfully!');
  } catch (err) {
    console.error(err);
  }
})();
