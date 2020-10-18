const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
	// Error Embed
	const questionembed = new MessageEmbed()
		.setTitle('❌ You did not specify the question')
		.setColor('#FF0000');
	if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
		return message.channel.send(`Please give the bot **Embed Links** Permission`);
	}
	const question = args.slice(0).join(' ');
	if (!question) {
		return message.channel.send(questionembed).then(msg => {
			if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
				msg.delete({
					timeout: 5000
				})
			} else {
				message.delete()
				msg.delete({
					timeout: 5000
				})
			}
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
}
module.exports.config = {
	name: '8ball',
	description: 'See if your wish comes true',
	usage: '<QUESTION>',
	accessableby: 'Members',
	category: 'Fun',
	timeout: 5000,
	aliases: ['8bel', '8bol']
};