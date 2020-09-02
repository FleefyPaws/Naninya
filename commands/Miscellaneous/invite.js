const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
	try {
		if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please Give The Bot **Embed Links** Permission`);
		}
		const embed = new MessageEmbed()
			.setTitle('Invite the bot to your server')
			.setDescription('[Bot Invite](https://discord.com/api/oauth2/authorize?client_id=714009112605622332&permissions=1544416374&scope=bot)')
			.setTimestamp()
			.setColor('#32CD32')
			.setFooter(`${bot.user.username} by FleeffyPawsYT`);
		message.channel.send(embed);
	} catch (err) {
		console.log(err);
		const errembed = new MessageEmbed()
			.setTitle('An error occured')
			.setColor('#FF0000')
			.setDescription(`Error: ${err}. \nPlease report this error to our support server: **[Link](https://discord.gg/CnHEb3h)**`);
		const user = bot.users.cache.get('443278070825091072')
		user.send(errembed)
		return message.channel.send(errembed);
	}
};

module.exports.config = {
	name: 'invite',
	description: 'An invite link for the bot',
	usage: '[COUNTRY]',
	accessableby: 'Members',
	category: 'Miscellaneous',
	timeout: 5000
};
