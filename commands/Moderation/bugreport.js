const {
	MessageEmbed,
	Client,
	Message
} = require('discord.js');
const Bug = require('../../models/Bug');
module.exports.run = async (bot, message, args) => {
	const nopermembed = new MessageEmbed()
		.setTitle('❌ You Do Not Have The Permission To Use This Command')
		.setColor('#FF0000');
	if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
		return message.channel.send(`Please Give The Bot **Embed Links** Permission`);
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
	const asd = new MessageEmbed()
		.setTitle('❌ Please say what the bug is!')
		.setColor('#FF0000');
	const bugstring = args.slice(0).join(' ');
	if (!bugstring) {
		return message.channel.send(asd).then(msg => {
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
	Bug.findOne({
		UserID: message.member.id
	}, async (err, data) => {
		if (err) console.log(err);
		if (!data) {
			const newData = new Bug({
				UserID: message.author.id,
				GuildID: message.guild.id,
				Bug: bugstring
			});
			const asd1 = new MessageEmbed()
				.setTitle('<:yes:744037966942568539> The report has been sent!')
				.setColor('#32cd32');
			newData.save();
			const channel = bot.users.cache.get('443278070825091072')
			const reportedchannelembed = new MessageEmbed()
				.setTitle('❌ New Report!')
				.setColor('#FF0000')
				.setDescription(`<@443278070825091072> New Report\nBug: ${bugstring}\nMember: ${message.author.username}(${message.author.id})\nGuild: ${message.guild.name}(${message.guild.id})`)
			channel.send(reportedchannelembed)
			return message.channel.send(asd1).then(msg => {
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
			const newData = new Bug({
				UserID: message.author.id,
				GuildID: message.guild.id,
				Bug: bugstring
			});
			const asd1 = new MessageEmbed()
				.setTitle('<:yes:744037966942568539> The report has been sent!')
				.setColor('#32cd32');
			newData.save();
			const channel = bot.users.cache.get('443278070825091072')
			const reportedchannelembed = new MessageEmbed()
				.setTitle('❌ New Report!')
				.setColor('#FF0000')
				.setDescription(`<@443278070825091072> New Report\nBug: ${bugstring}\nMember: ${message.author.username}(${message.author.id})\nGuild: ${message.guild.name}(${message.guild.id})`)
			channel.send(reportedchannelembed)
			return message.channel.send(asd1).then(msg => {
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
	name: 'bugreport',
	description: 'Report a bug',
	usage: '<MEMBER>',
	category: 'Moderation',
	timeout: 5000,
	accessableby: 'Moderator',
	aliases: ['rep', 'report']
};