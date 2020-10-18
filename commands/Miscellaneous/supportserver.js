const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
	if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
		return message.channel.send(`Please Give The Bot **Embed Links** Permission`);
	}
	const embed = new MessageEmbed()
		.setTitle('Invite the bot to your server')
		.setDescription('[Server](https://discord.gg/QTdEFhk)')
		.setTimestamp()
		.setColor("#32CD3")
		.setFooter(`${bot.user.username} by FleeffyPawsYT`);
	message.channel.send(embed);

};

module.exports.config = {
	name: 'supportserver',
	description: 'An invite link for the bot support server',
	accessableby: 'Members',
	timeout: 5000,
	category: 'Miscellaneous'
};