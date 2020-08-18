const {
  MessageEmbed
} = require("discord.js");
module.exports.run = async (bot, message, args) => {
  try {
    if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
      return message.channel.send(`Please give the bot **Embed Links** Permission`)
    }
    if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
      return message.channel.send(`Please give the bot **Manage Messages** Permission`)
    }
    const member = message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[0]) || message.member
    const avatar = member.user.displayAvatarURL({
      format: 'png',
      dynamic: true,
      size: 2048
    })
    const img = `https://api.alexflipnote.dev/filter/deepfry?image=${avatar}`
    const embed = new MessageEmbed()
      .setColor('#32cd32')
      .setTitle(`${member.user.username} has been deepfried:`)
      .setImage(`${img}`)
      .setFooter(`${bot.user.username} by FleeffyPawsYT`)
    message.channel.send(embed);
    } catch (e) {
        console.log(e)
        const errembed = new MessageEmbed()
            .setTitle("An error occured")
            .setColor('#FF000')
            .setDescription(`Error: ${e}. \nPlease report this error to our support server: **https: //discord.gg/s2ezK4X**`)
        message.channel.send(errembed)
    }
}

module.exports.config = {
  name: "deepfry",
  description: "Deepfry a member!",
  usage: "[MEMBER]",
  accessableby: "Members",
  category: "Image",
  timeout: '3000',
  timeoutname: '3 seconds'
}
