import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import 'dotenv/config';

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

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

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

(async () => {
  try {
    console.log('⏳ Registering slash commands...');
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );
    console.log('✅ Slash commands registered successfully!');
  } catch (err) {
    console.error('❌ Error registering commands:', err);
  }
})();
