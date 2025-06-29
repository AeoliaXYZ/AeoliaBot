import {SlashCommandBuilder} from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
      .setName('geticon')
      .setDescription('Get an icon from anything!')
      .addUserOption(option => {
        option.setName('user')
            .setDescription('User to get the profile picture from.')
      }).addStringOption(option => {
        option.setName('type')
            .setDescription('Type of icon to get.')
            .setRequired(true)
            .addChoices({name: "Server", value: "server"},
                {name: "Bot", value: "bot"}
            )
      }),
  async execute(interaction) {
    let user;
    if ((user = interaction.options.getUser('user')) != null) {
      return await interaction.reply({content: user.displayAvatarURL(), ephemeral: true});
    }
    let option = interaction.options.getString('type');
    if (option === 'server') {
      return await interaction.reply({content: interaction.guild.iconURL(), ephemeral: true});
    }
    if (option === 'bot') {
      return await interaction.reply({content: interaction.bot.displayAvatarURL(), ephemeral: true});
    }
    interaction.reply({content: "Subcommand not recognised!", ephemeral: true});
  }
}