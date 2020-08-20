const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
	try {
		const response = [
			`${args[0]}`,
			`${args[1]}`
		];
		if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please give the bot **Embed Links** Permission`);
		}
		if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please give the bot **Manage Messages** Permission`);
		}
		if (!args[0]) {
			message.delete();
			const nopermembed = new MessageEmbed()
				.setTitle('❌ Please provide the first choise')
				.setColor('#FF0000');
			return message.channel.send(nopermembed).then(msg => msg.delete({
				timeout: 5000
			}));
		}
		if (!args[0]) {
			message.delete();
			const nopermembed = new MessageEmbed()
				.setTitle('❌ Please provide the second choise')
				.setColor('#FF0000');
			return message.channel.send(nopermembed).then(msg => msg.delete({
				timeout: 5000
			}));
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
			.setDescription(`Error: ${err}. \nPlease report this error to our support server: **[Link](https://discord.gg/CnHEb3h)**`);
		return message.channel.send(errembed);
	}
};
module.exports.config = {
	name: 'choose',
	description: 'Choose The first or second choise',
	usage: '<CHOISE1> <CHOISE2>',
	accessableby: 'Members',
	timeout: 3000,
	timeoutname: '3 seconds',
	category: 'Fun'
};
