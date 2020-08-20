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
		if (!message.member.hasPermission('ADMINISTRATOR')) {
			message.delete();
			return message.channel.send(nopermembed).then(msg => msg.delete({
				timeout: 5000
			}));
		}
		var modLogChannel = message.guild.channels.cache.find(cha => cha.name === 'mod-logs');
		const invalididembed = new MessageEmbed()
			.setTitle('❌ Please provide the ID')
			.setColor('#FF0000');
		const isNaNIDembed = new MessageEmbed()
			.setTitle('❌ You need to provide an ID')
			.setColor('#FF0000');
		if (isNaN(args[0])) {
			message.delete();
			return message.channel.send(isNaNIDembed).then(msg => msg.delete({
				timeout: 5000
			}));
		}
		const bannedMember = await bot.guild.users.cache.get(args[0]);
		if (!bannedMember) {
			message.delete();
			return message.channel.send(invalididembed).then(msg => msg.delete({
				timeout: 5000
			}));
		}

		let reason = args.slice(1).join(' ');
		if (!reason) reason = 'No reason provided!';

		var modLogEmbed = new MessageEmbed()
			.setColor(`#32cd32`)
			.setTimestamp()
			.addField('**Action:** Un-Banned User', [
				`**Moderator:** ${message.author.tag}`,
				`**User:** ${bannedMember.tag} (${bannedMember.id})`,
				`**Reason:** ${reason})`
			])
			.setTimestamp()
			.setFooter(`${bot.config.botname} by ${bot.config.ownername}`);
		const sucess = new MessageEmbed()
			.setTitle(`❌ \`${bannedMember}\` has been unbanned from the guild with reason: \`${reason}\` by ${message.author}`)
			.setColor('#FF0000');
		try {
			message.delete();
			await message.guild.members.unban(bannedMember, reason);
			return message.channel.send(sucess).then(async (msg) => {
				msg.delete({
					timeout: 5000
				});
			});
		} catch {
			const unbannedembed = new MessageEmbed()
				.setTitle(`❌ ${bannedMember.user.tag} Is Already Unbanned`)
				.setColor('#FF0000');
			message.channel.send(unbannedembed);
		}
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
			.setDescription(`Error: ${err}. \nPlease report this error to our support server: **https: //discord.gg/s2ezK4X**`);
		message.channel.send(errembed);
	}
};
module.exports.config = {
	name: 'unban',
	description: 'Unbans a user',
	usage: '<USER>',
	accessableby: 'Moderators',
	timeout: 5000,
	timeoutname: '5 seconds',
	category: 'Moderation',
	aliases: ['ub', 'unbam']
};
