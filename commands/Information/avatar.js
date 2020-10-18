const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
	if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
		return message.channel.send(`Please Give The Bot **Embed Links** Permission`);
	}
	const member = message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[0]) ? message.guild.members.cache.get(args[0]) : message.member;
	const avatar = member.user.displayAvatarURL({
		format: 'png',
		dynamic: true,
		size: 2048
	});
	const embed = new MessageEmbed()
		.setColor('#32cd32')
		.setTitle(`Avatar for ${member.user.username}:`)
		.setDescription(`[png](${member.user.displayAvatarURL({
			format: `png`,
			dynamic: true,
			size: 2048
		})})    [jpg](${member.user.displayAvatarURL({
			format: `jpg`,
			dynamic: true,
			size: 2048
		})})    [webp](${member.user.displayAvatarURL({
			format: `webp`,
			dynamic: true,
			size: 2048
		})})`)
		.setImage(`${avatar}`)
		.setFooter(`${bot.user.username} by FleeffyPawsYT`);
	message.channel.send(embed);

};
module.exports.config = {
	name: 'avatar',
	description: "Views a user's avatar",
	usage: '[USER]',
	timeout: 5000,
	accessableby: 'Members',
	category: 'Information'
};