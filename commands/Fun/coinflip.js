const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
	try {
		if (!args[0]) {
			const coin = [
				`<a:coin:728602654003167283> ${message.member} flipped heads <a:coin:728602654003167283>`,
				`<a:coin:728602654003167283> ${message.member} flipped tails <a:coin:728602654003167283>`
			];

			const rand = coin[Math.floor(Math.random() * 2)];
			const embed = new MessageEmbed()
				.setTitle(`Coinflip!`)
				.setDescription(`${rand}`)
				.setFooter(`${bot.user.username} by FleeffyPawsYT`);
			message.channel.send(embed);
		} else if (args[0] <= 100) {
			const coin = [
				`0`,
				`1`
			];
			const all = [];
			let numOH = 0;
			let numOT = 0;
			for (let i = 0; i < args[0]; i++) {
				const rand = coin[Math.floor(Math.random() * 2)];
				if (rand === '0') {
					all.push('Heads');
					numOH++;
				} else {
					all.push('Tails');
					numOT++;
				}
			}
			const embed = new MessageEmbed()
				.setTitle(`Coinflip!`)
				.addField(`${message.member.user.username} Rolled:`, [
					` `,
					`\n`,
					`${all.join(', ')}`,
					`\n`,
					`Heads: ${numOH}`,
					`Tails: ${numOT}`
				])
				.setColor('#32cd32')
				.setTimestamp()
				.setFooter(`${bot.user.username} by FleeffyPawsYT`);
			return message.channel.send(embed);
		} else if (args[0] >= 100) {
			return message.channel.send('You cannot flip more than 100 coins at a time');
		} else {
			return message.channel.send('Please view the help command for coinflip');
		}
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
	name: 'coinflip',
	description: 'Flip upto 100 coins at a time',
	usage: '[COINS]',
	accessableby: 'Members',
	category: 'Fun',
	timeout: 5000,
	aliases: ['cp', 'cf']
};