import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import 'dotenv/config';

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

// Define your commands
const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!')
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

try {
  console.log('⏳ Refreshing slash commands...');
  await rest.put(
    Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
    { body: commands }
  );
  console.log('✅ Slash commands registered successfully!');
} catch (error) {
  console.error('❌ Error registering commands:', error);
}
