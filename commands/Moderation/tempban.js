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
		if (!message.guild.me.hasPermission('MANAGE_ROLES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please give the bot **Manage Roles** Permission`);
		}
		if (!message.member.hasPermission('BAN_MEMBERS')) {
			message.delete();
			return message.channel.send(nopermembed).then(msg => msg.delete({
				timeout: 5000
			}));
		}
		const nulluserembed = new MessageEmbed()
			.setTitle('❌ Please give the id or mention a valid member')
			.setColor('#FF0000');
		const user = message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[0]);
		if (!user) {
			message.delete();
			return message.reply(nulluserembed).then(msg => msg.delete({
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
		let reason = args.slice(2).join(' ');
		if (!reason) reason = 'No reason provided';

		var modLogChannel = message.guild.channels.cache.find(cha => cha.name === 'mod-logs');
		var modLogEmbed = new MessageEmbed()
			.setColor(`#32cd32`)
			.setTimestamp()
			.addField('**Action:** Ban', [
				`**Moderator:** ${message.author.tag}`,
				`**User:** ${user.user.tag}`,
				`**Reason:** ${reason}`,
				`**Duration:** ${parseInt(args[1])}Days`
			])
			.setTimestamp()
			.setFooter(`${bot.config.botname} by ${bot.config.ownername}`);
		const sucessembed = new MessageEmbed()
			.setTitle(`<:yes:744037966942568539> **${message.member}** has Temp-Banned **${user}** for ${parseInt(args[1])}Days 🔨`)
			.setColor('#32CD32');
		message.delete();
		await user.ban(reason, {
			days: parseInt(args[1])
		});
		message.channel.send(sucessembed).then(msg => {
			msg.delete({
				timeout: 5000
			});
		});
		if (!modLogChannel) {
			if (Math.random() * 100 < 5) {
				return message.channel.send('You can receive mod-logs in a channel by creating a channel called `mod-logs`');
			} else {
				return;
			}
		} else {
			return modLogChannel.send(modLogEmbed);
		}
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
	name: 'tempban',
	description: 'Temp-Bans a user',
	usage: '<MEMBER> <NUMBER OF DAYS> [REASON]',
	accessableby: 'Moderators',
	timeout: 5000,
	timeoutname: '5 seconds',
	category: 'Moderation',
	aliases: ['tb', 'tbam']
};
