const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
	try {
		if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please Give The Bot **Embed Links** Permission`)
		}
		const embed = new MessageEmbed()
			.setTitle('Invite the bot to your server')
			.setDescription('[Bot Invite](https://bit.ly/3iVKDX6)')
			.setTimestamp()
			.setFooter(`${bot.user.username} by FleeffyPawsYT`);
		message.channel.send(embed);
	} catch (e) {
		console.log(e)
		const errembed = new MessageEmbed()
			.setTitle("An error occured")
			.setDescription(`Error: ${error}. \nPlease report this error to our support server: **https: //discord.gg/s2ezK4X**`)
		message.channel.send(errembed)
	}
}

module.exports.config = {
	name: "invite",
	description: "An invite link for the bot",
	usage: "[COUNTRY]",
	accessableby: "Members",
	category: "Miscellaneous",
	timeout: 5000,
	timeoutname: '5 seconds'
}