import { Client, GatewayIntentBits, Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import 'dotenv/config';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
  console.log(`🤖 Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'zematools') {
    // Create an embed
    const embed = new EmbedBuilder()
      .setTitle('⚡ ZemaTools is here!')
      .setDescription('Complete SBCs faster and cheaper. Check out the links below.')
      .setColor(0x00AE86) // teal color
      .setURL('https://example.com') // optional: title clickable
      .setFooter({ text: 'ZemaTools Bot', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    // Create buttons
    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Visit Website')
        .setStyle(ButtonStyle.Link)
        .setURL('https://example.com'),
      new ButtonBuilder()
        .setLabel('Join Discord')
        .setStyle(ButtonStyle.Link)
        .setURL('https://discord.gg/yourserver')
    );

    await interaction.reply({ embeds: [embed], components: [buttons] });
  }
});

client.login(process.env.DISCORD_TOKEN);
