import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import 'dotenv/config';

const commands = [
  new SlashCommandBuilder()
    .setName('zematools')
    .setDescription('Sends the ZemaTools message with embed and buttons')
    .toJSON(),
  new SlashCommandBuilder()
    .setName('active-dev-badge')
    .setDescription('Guides you through claiming the Active Developer Badge on Discord')
    .toJSON(),
  new SlashCommandBuilder()
    .setName('launchzematools')
    .setDescription('Gives you a button to open the ZemaTools Render link')
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('⏳ Registering slash commands...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('✅ Slash commands registered successfully!');
  } catch (err) {
    console.error(err);
  }
})();
