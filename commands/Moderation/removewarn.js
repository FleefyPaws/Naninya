const {
	MessageEmbed
} = require('discord.js');
const Warn = require('../../models/warns');
module.exports.run = async (bot, message, args) => {
	const nopermembed = new MessageEmbed()
		.setTitle('❌ You do not have the permission to use this command')
		.setColor('#FF0000');
	if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
		return message.channel.send(`Please give the bot **Embed Links** Permission`);
	}
	if (!message.member.hasPermission(['MANAGE_MESSAGES'])) {
		message.delete();
		return message.channel.send(nopermembed).then(msg => {
			if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) return;
			else msg.delete({
				timeout: 5000
			})
		});
	}
	let user = message.mentions.members.first();
	if (!message.mentions.members.first()) {
		user = message.guild.members.cache.get(args[0]);
	}
	const nulluserembed = new MessageEmbed()
		.setTitle('❌ Please give the ID or mention a valid member')
		.setColor('#FF0000');
	if (!user) {
		return message.channel.send(nulluserembed).then(msg => {
			if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
				msg.delete({
					timeout: 5000
				})
			} else {
				message.delete()
				msg.delete({
					timeout: 5000
				})
			}
		});
	}
	const dumb = new MessageEmbed()
		.setTitle('❌ You really dumb?')
		.setColor('#FF0000');
	if (user.id === message.member.id) {
		message.delete();
		return message.channel.send(dumb).then(msg => {
			if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
				msg.delete({
					timeout: 5000
				})
			} else {
				message.delete()
				msg.delete({
					timeout: 5000
				})
			}
		});
	}
	const nullwarnid = new MessageEmbed()
		.setTitle('❌ Please provide the warn id')
		.setColor('#FF0000');
	const warnid = parseInt(args[1]);
	if (isNaN(warnid) || !warnid) {
		message.delete();
		return message.channel.send(nullwarnid).then(msg => {
			if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
				msg.delete({
					timeout: 5000
				})
			} else {
				message.delete()
				msg.delete({
					timeout: 5000
				})
			}
		});
	}
	const nowarnembed = new MessageEmbed()
		.setTitle('❌ That user has no warns in the server')
		.setColor('#FF0000');
	Warn.findOne({
			Guild: message.guild.id,
			User: user.id
		},
		async (err, data) => {
			if (err) console.log(err);
			if (!data) {
				return message.channel.send(nowarnembed);
			} else {
				data.Warns.splice(parseInt(args) - 1, 1);
				const sucessembed = new MessageEmbed()
					.setTitle(`<:yes:744037966942568539> Removed Case **${warnid}** From \`${user.user.username}\``)
					.setColor('#32CD32');
				message.channel.send(sucessembed).then(msg => {
					if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) return;
					else msg.delete({
						timeout: 5000
					})
				});
				data.save();
			}
		});

};

module.exports.config = {
	name: 'removewarn',
	description: 'Remove a warn',
	usage: '<MEMBER> <REASON>',
	category: 'Moderation',
	timeout: 5000,
	accessableby: 'Moderators',
	aliases: ['r-w', 'rw']
};