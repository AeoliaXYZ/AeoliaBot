const {SlashCommandBuilder} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('geticon')
      .setDescription('Get an icon from anything!')
      .addUserOption(option => option.setName('user')
          .setDescription('User to get the profile picture from.')
          .setRequired(false))
      .addStringOption(option => option.setName('type')
          .setDescription('Type of icon to get.')
          .setRequired(false)
          .addChoices({name: "Server", value: "server"}, {name: "Bot", value: "bot"})), async execute(interaction) {
    const user = interaction.options.getUser('user');
    if (user) {
      return await interaction.reply({content: user.displayAvatarURL(), ephemeral: true});
    }

    const option = interaction.options.getString('type');
    if (option === 'server') {
      return await interaction.reply({content: interaction.guild.iconURL(), ephemeral: true});
    }
    if (option === 'bot') {
      return await interaction.reply({content: interaction.client.user.displayAvatarURL(), ephemeral: true});
    }

    await interaction.reply({content: "Subcommand not recognised!", ephemeral: true});
  }
}