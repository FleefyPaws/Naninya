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
	if (!message.member.hasPermission('MANAGE_MESSAGES')) {
		return message.channel.send(nopermembed).then(msg => {
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
	const user = message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[0]);
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
	let reason = args.slice(1).join(' ');
	if (!reason) reason = 'No reason provided';
	Warn.findOne({
			Guild: message.guild.id,
			User: user.id
		},
		async (err, data) => {
			if (err) console.log(err);
			if (!data) {
				const newWarns = new Warn({
					User: user.id,
					Guild: message.guild.id,
					Warns: [{
						Moderator: message.author.id,
						Reason: reason
					}]
				});
				newWarns.save();
				const successembed = new MessageEmbed()
					.setTitle(`<:yes:744037966942568539> \`${user.user.username}\` Has Been Warned`)
					.setDescription(`Reason: **${reason}** \nWarns: **1**`)
					.setColor('#32cd32');
				message.channel.send(successembed).then(msg => {
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
			} else {
				data.Warns.unshift({
					Moderator: message.author.id,
					Reason: reason
				});
				data.save();
				const successembed = new MessageEmbed()
					.setTitle(`<:yes:744037966942568539> \`${user.user.username}\` Has Been Warned`)
					.setDescription(`Reason: **${reason}** \nWarns: **${data.Warns.length}**`)
					.setColor('#32CD32');
				message.channel.send(successembed).then(msg => {
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
		});

};

module.exports.config = {
	name: 'warn',
	description: 'Warn a member',
	usage: '<MEMBER> <REASON>',
	category: 'Moderation',
	timeout: 5000,
	accessableby: 'Moderators',
	aliases: ['w']
};