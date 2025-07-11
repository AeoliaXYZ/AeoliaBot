const {Events} = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`Command ${interaction.commandName} not found!`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      const options = {content: "An error occurred executing this command.", flags: 64}
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(options);
      } else {
        await interaction.reply(options)
      }
    }
  }
}