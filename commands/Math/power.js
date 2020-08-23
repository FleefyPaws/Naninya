const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
	try {
		const math = args[0];
		const power = args[1];
		if (!math) {
			message.delete();
			const err1 = new MessageEmbed()
				.setTitle('❌ Please provide the first number')
				.setColor('#FF0000');
			return message.channel.send(err1).then(msg => msg.delete({
				timeout: 5000
			}));
		}
		if (!power) {
			message.delete();
			const err2 = new MessageEmbed()
				.setTitle('❌ Please provide the first number')
				.setColor('#FF0000');
			return message.channel.send(err2).then(msg => msg.delete({
				timeout: 5000
			}));
		}
		if (isNaN(math)) {
			message.delete();
			const err1 = new MessageEmbed()
				.setTitle('❌ The first number should be a number')
				.setColor('#FF0000');
			return message.channel.send(err1).then(msg => msg.delete({
				timeout: 5000
			}));
		}
		if (isNaN(power)) {
			message.delete();
			const err1 = new MessageEmbed()
				.setTitle('❌ The second number should be a number')
				.setColor('#FF0000');
			return message.channel.send(err1).then(msg => msg.delete({
				timeout: 5000
			}));
		}
		const embed = new MessageEmbed()
			.setColor('#32cd32')
			.setTitle('Math')
			.addField(`${math} To the power of ${power}:`, `\`\`\`js\n${Math.pow(math, power)}\`\`\``)
			.setTimestamp();

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
	name: 'power',
	description: 'Displays the power of the given number with the given power',
	usage: '<NUMBER> <POWER>',
	accessableby: 'Members',
	timeout: 3000,
	category: 'Math'
};