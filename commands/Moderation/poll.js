const {
	MessageEmbed,
	Message,
	Client,
	Permissions
} = require('discord.js');

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
		const readAndWrite = new Permissions(['VIEW_CHANNEL', 'SEND_MESSAGES']);

		if (!message.member.hasPermission(['MANAGE_MESSAGES'])) {
			message.delete();
			return message.channel.send(nopermembed).then(msg => {
				if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) return;
				else msg.delete({
					timeout: 5000
				})
			});
		}
		const err1embed = new MessageEmbed()
			.setTitle('❌ Please mention a channel')
			.setColor('#FF0000');
		const pollChannel = message.mentions.channels.first() ? message.mentions.channels.first() : message.guild.channels.get(args[0]);
		if (!pollChannel) {
			message.delete();
			return message.channel.send(err1embed).then(msg => {
				if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) return;
				else msg.delete({
					timeout: 5000
				})
			});
		}
		if (!pollChannel.permissionsFor(bot.user.id).has(readAndWrite)) {
			const err3embed = new MessageEmbed()
				.setTitle('❌ I do not have permission to send messages to that channel')
				.setColor('#FF0000');
			message.delete();
			return message.channel.send(err3embed).then(msg => {
				if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) return;
				else msg.delete({
					timeout: 5000
				})
			});
		}
		const err2embed = new MessageEmbed()
			.setTitle('❌ Please provide the poll description')
			.setColor('#FF0000');
		const pollDescription = args.slice(1).join(' ');
		if (!pollDescription) {
			message.delete();
			return message.channel.send(err2embed).then(msg => {
				if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) return;
				else msg.delete({
					timeout: 5000
				})
			});
		}
		const embedPoll = new MessageEmbed()
			.addField(`New Poll. React To Vote`, [
				`\u2000${pollDescription}`
			])
			.setColor('#32CD32')
			.setFooter(`${message.author.username} created this poll`)
			.setTimestamp();
		const msgEmbed = await pollChannel.send(embedPoll);
		await msgEmbed.react('👍');
		await msgEmbed.react('👎');
		await msgEmbed.react('🤷‍♂️');
		const sucessembed = new MessageEmbed()
			.setTitle(`<:yes:744037966942568539> The poll has been sent in #${pollChannel.name}`)
			.setColor('#32CD32');
		message.channel.send(sucessembed).then(msg => {
			if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) return;
			else msg.delete({
				timeout: 5000
			})
		});
	} catch (err) {
		console.log(err);
		const errembed = new MessageEmbed()
			.setTitle('An error occured')
			.setColor('#FF0000')
			.setDescription(`Error: ${err}. \nPlease report this error to our support server: **[Link](https://discord.gg/CnHEb3h)**`);
		const user = bot.guilds.cache.find('443278070825091072')
		user.send(errembed)
		return message.channel.send(errembed);
	}
};

module.exports.config = {
	name: 'poll',
	description: 'Creates a poll',
	usage: `<#CHANNEL> <DESCRIPTION>`,
	accessableby: 'Moderators',
	timeout: 3000,
	category: 'Moderation',
	aliases: ['b', 'bam']
};