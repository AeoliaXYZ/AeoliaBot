const {Events} = require('discord.js');
const {parentNames} = require('../config.json');

module.exports = {
  name: Events.ChannelCreate,
  async execute(channel) {
    console.log(parentNames)
    if (!channel.guild) return;
    const parent = channel.parent;
    if (parent == null) return;
    let parentName = parent.name;
    console.log(parentName);
    for (const name in parentNames) {
      if (name === parentName) await channel.send(parentNames[name]);
    }
  }
}