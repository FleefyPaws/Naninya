const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
	if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
		return message.channel.send(`Please Give The Bot **Embed Links** Permission`);
	}
	if (!args[0]) {
		const errembed = new MessageEmbed()
			.setTitle('❌ Please specify the color of the embed!')
			.setColor('#FF0000');
		message.channel.send(errembed).then(msg => {
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
	} else if (!args.slice(1).join(' ')) {
		const err1embed = new MessageEmbed()
			.setTitle('❌ Please specify the description of the embed!')
			.setColor('#FF0000');
		message.channel.send(err1embed).then(msg => {
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
	} else if (args.slice(1).join(' ') >= 2048) {
		const err2embed = new MessageEmbed()
			.setTitle('❌ Embed descriptions are limited to 2048 characters!')
			.setColor('#FF0000');
		message.channel.send(err2embed).then(msg => {
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
		const embed = new MessageEmbed()
			.setTitle('Embed')
			.setColor(args[0])
			.setDescription(args.slice(1).join(' '))
			.setTimestamp()
			.setFooter(`${bot.user.username} by FleeffyPawsYT`);
		message.channel.send(embed);
	}

};

module.exports.config = {
	name: 'embed',
	description: 'Creates an embed',
	usage: '<COLOR> <DESC>',
	timeout: 5000,
	accessableby: 'Members',
	category: 'Miscellaneous'
};