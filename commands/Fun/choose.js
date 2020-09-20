const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
	// Error Embeds
	return message.channel.send("**Will Fix Soon**")
	const firstchoise = new MessageEmbed()
		.setTitle('❌ You did not specify the first choise!')
		.setColor('#FF0000');
	const secondchoise = new MessageEmbed()
		.setTitle('❌ You did not specify the first choise!')
		.setColor('#FF0000');
	try {
		if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please give the bot **Embed Links** Permission`);
		}
		const response = [
			`${args[0]}`,
			`${args[1]}`
		];
		if (!args[0]) {
			return message.channel.send(firstchoise).then(msg => {
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
		if (!args[0]) {
			return message.channel.send(secondchoise).then(msg => {
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
		const xander = response[Math.floor(Math.random() * response.length)];
		message.channel.startTyping();
		const embed = new MessageEmbed()
			.setColor(`#32cd32`)
			.addField('Choises:', `\`\`\`${args[0].slice(0, 1).toUpperCase() + args[0].slice(1)} | ${args[1].slice(0, 1).toUpperCase() + args[1].slice(1)}\`\`\``)
			.addField('I Choose:', `\`\`\`${xander.slice(0, 1).toUpperCase() + xander.slice(1)}\`\`\``)
			.setTimestamp()
			.setFooter(`${bot.user.username} by FleeffyPawsYT`);
		message.channel.stopTyping();
		message.channel.send(embed);
	} catch (err) {
		console.log(err);
		const errembed = new MessageEmbed()
			.setTitle('An error occured')
			.setColor('#FF0000')
			.setDescription(`Error: ${err}. \nPlease report this error to our support server: **[Link](https://discord.gg/QTdEFhk)**`);
		const user = bot.users.cache.get('443278070825091072')
		user.send(errembed)
		return message.channel.send(errembed);
	}
};
module.exports.config = {
	name: 'choose',
	description: 'Choose The first or second choise',
	usage: '<CHOISE1> <CHOISE2>',
	accessableby: 'Members',
	timeout: 3000,
	category: 'Fun'
};
