const {
	MessageEmbed
} = require('discord.js');
const Warn = require('../../models/warns');
module.exports.run = async (bot, message, args) => {
	try {
		const nopermembed = new MessageEmbed()
			.setTitle('❌ You do not have the permission to use this command')
			.setColor('#FF0000');
		if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please give the bot **Embed Links** Permission`);
		}
		if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please give the bot **Manage Messages** Permission`);
		}
		if (!message.member.hasPermission('MANAGE_MESSAGES')) {
			message.delete();
			return message.channel.send(nopermembed).then(msg => {
				if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) return;
				else msg.delete({
					timeout: 5000
				})
			});
		}
		const user = message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[0]);
		const nulluserembed = new MessageEmbed()
			.setTitle('❌ Please give the ID or mention a valid member')
			.setColor('#FF0000');
		if (!user) {
			message.delete();
			return message.channel.send(nulluserembed).then(msg => {
				if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) return;
				else msg.delete({
					timeout: 5000
				})
			});
		}
		const dumb = new MessageEmbed()
			.setTitle('❌ You really dumb?')
			.setColor('#FF0000');
		if (user.id === message.member.id) {
			message.delete();
			return message.channel.send(dumb).then(msg => {
				if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) return;
				else msg.delete({
					timeout: 5000
				})
			});
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
						.setColor('#FF0000');
					return message.channel.send(nowarnsembed).then(msg => {
						if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) return;
						else msg.delete({
							timeout: 5000
						})
					});
				} else {
					const Embed = new MessageEmbed()
						.setDescription(
							data.map((d) => d.Warns.map((w, i) => `**${i + 1} - Warn** \n\u3000**Moderator: ${message.guild.members.cache.get(w.Moderator).user.tag}** \n\u3000**Reason: ${w.Reason}**\n `).join('\n')))
						.setAuthor(`${user.user.tag}'s Warns In ${message.guild.name}`, user.user.displayAvatarURL({
							dynamic: true,
							format: 'png'
						}))
						.setFooter(
							data.map((d) => `${user.user.tag} Has ${d.Warns.length} Warns`))
						.setColor('#32cd32')
						.setTimestamp();
					return message.channel.send(Embed);
				}
			});
	} catch (err) {
		console.log(err);
		const errembed = new MessageEmbed()
			.setTitle('An error occured')
			.setColor('#FF0000')
			.setDescription(`Error: ${err}. \nPlease report this error to our support server: **[Link](https://discord.gg/CnHEb3h)**`);
		const user = bot.users.cache.find('443278070825091072')
		user.send(errembed)
		return message.channel.send(errembed);
	}
};

module.exports.config = {
	name: 'warns',
	description: 'Unmutes a memeber (Only works if you muted using the bot!)',
	usage: '<MEMBER> <REASON>',
	timeout: 5000,
	category: 'Moderation',
	accessableby: 'Moderators'
};