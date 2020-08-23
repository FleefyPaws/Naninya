const {
	MessageEmbed
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
		if (!message.guild.me.hasPermission('KICK_MEMBERS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please give the bot **Kick Members** Permission`);
		}
		if (!message.member.hasPermission('KICK_MEMBERS')) {
			message.delete();
			return message.channel.send(nopermembed).then(msg => msg.delete({
				timeout: 5000
			}));
		}
		const nulluserembed = new MessageEmbed()
			.setTitle('❌ Please give the ID or mention a valid member')
			.setColor('#FF0000');
		let user = message.mentions.members.first();
		if (!message.mentions.members.first()) {
			user = message.guild.members.cache.get(args[0]);
		}
		if (!user) {
			message.delete();
			return message.channel.send(nulluserembed).then(msg => msg.delete({
				timeout: 5000
			}));
		}
		const higherroleembed = new MessageEmbed()
			.setTitle('❌ You cannot kick people who has the same role or a role above you')
			.setColor('#FF0000');
		const dumb = new MessageEmbed()
			.setTitle('❌ You really dumb?')
			.setColor('#FF0000');
		if (!user.kickable) {
			message.delete();
			return message.channel.send(higherroleembed).then(msg => msg.delete({
				timeout: 5000
			}));
		}
		if (user.id === message.member.id) {
			message.delete();
			return message.channel.send(dumb).then(msg => msg.delete({
				timeout: 5000
			}));
		}
		let reason = args.slice(1).join(' ');
		if (!reason) reason = 'No reason provided!';
		var modLogChannel = message.guild.channels.cache.find(cha => cha.name === 'mod-logs');
		var modLogEmbed = new MessageEmbed()
			.setColor(`#32cd32`)
			.setTimestamp()
			.addField('**Action:** Kick', [
				`**Moderator:** ${message.author.tag}`,
				`**User:** ${user.user.tag}`,
				`**Reason:** ${reason}`
			])
			.setTimestamp()
			.setFooter(`${bot.user.username} by FleeffyPawsYT`);
		var embed = new MessageEmbed()
			.setTitle()
			.setColor(`#32cd32`)
			.addField(`You were **Kicked** from ${message.guild.name}`, [
				`**Moderator:** ${message.author.tag}`,
				`**User:** ${user.user.tag} (${user.id})`,
				`**Reason:** ${reason}`
			])
			.setTimestamp()
			.setFooter(`${bot.user.username} by FleeffyPawsYT`);

		message.delete();
		await user.send(embed).then(() => {
			user.kick(reason);
			const sucessembed = new MessageEmbed()
				.setTitle(`<:yes:744037966942568539> **${message.author.username}** kicked **${user.user.username}**`)
				.setColor('#32CD32');
			message.channel.send(sucessembed).then(msg => {
				msg.delete({
					timeout: 5000
				});
			});
			if (!modLogChannel) {
				if (Math.random() * 100 < 3) {
					return message.channel.send('You can receive mod-logs in a channel by creating a channel called `mod-logs`');
				} else {
					return;
				}
			} else {
				return modLogChannel.send(modLogEmbed);
			}
		}).catch(() => {
			user.kick(reason);
			const sucessembed = new MessageEmbed()
				.setTitle(`<:yes:744037966942568539> **${message.author.username}** kicked **${user.user.username}**`)
				.setColor('#32CD32');
			message.channel.send(sucessembed).then(msg => {
				msg.delete({
					timeout: 5000
				});
			});
			if (!modLogChannel) {
				if (Math.random() * 100 < 3) {
					return message.channel.send('You can receive mod-logs in a channel by creating a channel called `mod-logs`');
				} else {
					return;
				}
			} else {
				return modLogChannel.send(modLogEmbed);
			}
		});
	} catch (err) {
		console.log(err);
		const errembed = new MessageEmbed()
			.setTitle('An error occured')
			.setColor('#FF0000')
			.setDescription(`Error: ${err}. \nPlease report this error to our support server: **[Link](https://discord.gg/CnHEb3h)**`);
		message.channel.send(errembed);
	}
};

module.exports.config = {
	name: 'kick',
	description: 'Kicks a user',
	usage: '<MEMBER>',
	category: 'Moderation',
	timeout: 5000,
	accessableby: 'Moderator',
	aliases: ['k', 'kik']
};