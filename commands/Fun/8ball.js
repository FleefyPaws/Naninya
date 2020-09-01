const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
	try {
		if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please give the bot **Embed Links** Permission`);
		}
		const question = args.slice(0).join(' ');
		if (!question) {
			message.delete();
			const nopermembed = new MessageEmbed()
				.setTitle('❌ You did not specify your question!')
				.setColor('#FF0000');
			return message.channel.send(nopermembed).then(msg => {
				if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) return;
				else msg.delete({
					timeout: 5000
				})
			});
		}
		const responses = [
			'Yes',
			'No',
			'Definetly',
			'Absoloutely',
			'Not in a million years'
		];
		const response =
			responses[Math.floor(Math.random() * responses.length)];
		const Embed = new MessageEmbed()
			.setTitle(`🎱 8Ball 🎱`)
			.addField(`Your question:`, `\`\`\`${question}\`\`\``)
			.addField(`My reply:`, `\`\`\`${response}\`\`\``)
			.setColor(`#32cd32`)
			.setFooter(`${bot.user.username} by FleeffyPawsYT`);
		return message.channel.send(Embed);
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
	name: '8ball',
	description: 'See if your wish comes true',
	usage: '<QUESTION>',
	accessableby: 'Members',
	category: 'Fun',
	timeout: 5000,
	aliases: ['8bel', '8bol']
};