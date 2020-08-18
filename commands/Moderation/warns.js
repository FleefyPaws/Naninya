const {
  MessageEmbed,
  Message,
  Client
} = require('discord.js');
const Warn = require('../../models/warns');
/**
 * 
 * @param {Client} bot 
 * @param {Message} message 
 * @param {String[]} args 
 */
module.exports.run = async (bot, message, args) => {
  try {
    const nopermembed = new MessageEmbed()
      .setTitle("❌ You do not have the permission to use this command")
      .setColor('#FF0000')
    if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
      return message.channel.send(`Please give the bot **Embed Links** Permission`)
    }
    if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
      return message.channel.send(`Please give the bot **Manage Messages** Permission`)
    }
    if (!message.guild.me.hasPermission('BAN_MEMBERS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
      return message.channel.send(`Please give the bot **Ban Members** Permission`)
    }
    if (!message.guild.me.hasPermission('KICK_MEMBERS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
      return message.channel.send(`Please give the bot **Kick Members** Permission`)
    }
    if (!message.guild.me.hasPermission('MANAGE_ROLES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
      return message.channel.send(`Please give the bot **Manage Roles** Permission`)
    }
    if (!message.member.hasPermission(['MANAGE_ROLES', 'MANAGE_MESSAGES'])) {
      message.delete()
      return message.channel.send(nopermembed).then(msg => msg.delete({
        timeout: 5000
      }));
    }
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const nulluserembed = new MessageEmbed()
      .setTitle('❌ Please give the ID or mention a valid member')
      .setColor('#FF0000')
    if (!user) {
      message.delete();
      return message.channel.send(nulluserembed).then(msg => msg.delete({
        timeout: 5000
      }));
    }
    const dumb = new MessageEmbed()
      .setTitle('❌ You really dumb?')
      .setColor('#FF0000')
    if (user.id === message.member.id) {
      message.delete();
      return message.channel.send(dumb).then(msg => msg.delete({
        timeout: 5000
      }));
    }
    Warn.find({
        Guild: message.guild.id,
        User: user.id
      },
      async (err, data) => {
        if (err) console.log(err);
        if (!data) {
          const nowarnsembed = new MessageEmbed()
            .setTitle(`❌ ${user.user.tag} Has Not Got Any Warns In This Guild`)
            .setColor('#FF0000')
          return message.channel.send(nowarnsembed);
        } else {
          const Embed = new MessageEmbed()
            .setDescription(
              data.map((d) => {
                return d.Warns.map((w, i) => `**${i + 1} - Warn** \n\u3000**Moderator: ${message.guild.members.cache.get(w.Moderator).user.tag}** \n\u3000**Reason: ${w.Reason}**\n `).join("\n");
              }))
            .setAuthor(`${user.user.tag}'s Warns In ${message.guild.name}`, user.user.displayAvatarURL({
              dynamic: true,
              format: 'png'
            }))
            .setFooter(
              data.map((d) => {
                return `${user.user.tag} Has ${d.Warns.length} Warns`
              }))
            .setColor('#32cd32')
            .setTimestamp()
          return message.channel.send(Embed)
        };
      })
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
  name: "warns",
  description: "Unmutes a memeber (Only works if you muted using the bot!)",
  usage: "<MEMBER> <REASON>",
  timeout: 5000,
  timeoutname: '5 seconds',
  category: 'Moderation',
  accessableby: "Moderators"
}
