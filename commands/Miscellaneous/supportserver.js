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
			.setDescription('[Server](https://discord.gg/CnHEb3h)')
			.setTimestamp()
			.setFooter(`${bot.user,username} by FleeffyPawsYT`);
		message.channel.send(embed);
	} catch (e) {
		console.log(e)
		const errembed = new MessageEmbed()
			.setTitle("An error occured")
			.setDescription(`Error: ${e}. \nPlease report this error to our support server: **https: //discord.gg/s2ezK4X**`)
		message.channel.send(errembed)
	}
}

module.exports.config = {
	name: "supportserver",
	description: "An invite link for the bot support server",
	accessableby: "Members",
	timeout: 5000,
	timeoutname: '5 seconds',
	category: 'Miscellaneous'
}
