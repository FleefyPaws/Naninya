const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
	try {
		if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please give the bot **Embed Links** Permission`);
		}
		if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please give the bot **Manage Messages** Permission`);
		}
		const member = message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[0]) || message.member;
		const avatar = member.user.displayAvatarURL({
			format: 'png',
			dynamic: true,
			size: 2048
		});
		const embed = new MessageEmbed()
			.setColor(0xFFFF00)
			.setTitle(`${member.user.username} has been wasted:`)
			.setImage(`https://some-random-api.ml/canvas/wasted?avatar=${avatar}`)
			.setFooter(`${bot.user.username} by FleeffyPawsYT`);
		message.channel.send(embed);
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
	name: 'wasted',
	description: 'Waste a member!',
	usage: '[MEMBER]',
	accessableby: 'Members',
	category: 'Image',
	timeout: 5000
};