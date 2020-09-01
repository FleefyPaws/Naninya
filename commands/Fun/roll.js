const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
	try {
		if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please give the bot **Embed Links** Permission`);
		}
		if (!args[0]) {
			const dice = [
				`<:1:731504590050164857> (1)`,
				`<:2:731504590188707891> (2)`,
				`<:3:731504590175862895> (3)`,
				`<:4:731504589911621663> (4)`,
				`<:5:731504590062747729> (5)`,
				`<:6:731504592118087720> (6)`
			];

			const rand = dice[Math.floor(Math.random() * dice.length)];
			const embed = new MessageEmbed()
				.setTitle(`Dice Rolled!`)
				.setDescription(`${message.member.user.username} Rolled \n ${rand}`)
				.setFooter(`${bot.user.username} by FleffyPawsYT`);
			message.channel.send(embed);
		} else if (parseInt(args[0]) <= 60) {
			const dice = [
				`0`,
				`1`,
				`2`,
				`3`,
				`4`,
				`5`
			];
			const all = [];
			let num1 = 0;
			let num2 = 0;
			let num3 = 0;
			let num4 = 0;
			let num5 = 0;
			let num6 = 0;
			for (let i = 0; i < args[0]; i++) {
				const rand = dice[Math.floor(Math.random() * dice.length)];
				if (rand === '0') {
					all.push('<:1_:731504590050164857> **(1)');
					num1++;
				} else if (rand === '1') {
					all.push('<:2_:731504590188707891> **(2)');
					num2++;
				} else if (rand === '2') {
					all.push('<:3:731504590175862895> **(3)');
					num3++;
				} else if (rand === '3') {
					all.push('<:4:731504589911621663> **(4)');
					num4++;
				} else if (rand === '4') {
					all.push('<:5:731504590062747729> **(5)');
					num5++;
				} else {
					all.push('<:6:731504592118087720> **(6)');
					num6++;
				}
			}
			const num2Tot = num2 * 2;
			const num3Tot = num3 * 3;
			const num4Tot = num4 * 4;
			const num5Tot = num5 * 5;
			const num6Tot = num6 * 6;
			const numTOT = num1 + num2Tot + num3Tot + num4Tot + num5Tot + num6Tot;
			const embed = new MessageEmbed()
				.setTitle(`Dice Rolled!`)
				.setDescription(`${message.member.user.username} Rolled \n ${all.join('**, ')}\n** **Total: ${numTOT}**`)
				.setColor('#32cd32')
				.setTimestamp()
				.setFooter(`${bot.user.username} by FleeffyPawsYT`);
			message.channel.send(embed);
		}
		if (args[0] >= 60) {
			message.delete();
			const nopermembed = new MessageEmbed()
				.setTitle('❌ You cannot flip more than 60 coins at a time')
				.setColor('#FF0000');
			return message.channel.send(nopermembed).then(msg => msg.delete({
				timeout: 5000
			}));
		}
	} catch (err) {
		console.log(err);
		const errembed = new MessageEmbed()
			.setTitle('An error occured')
			.setColor('#FF0000')
			.setDescription(`Error: ${err}. \nPlease report this error to our support server: **[Link](https://discord.gg/CnHEb3h)**`);
		const user = bot.users.cache.find('443278070825091072')
		user.send(errembed)
		return message.channel.send(errembed);
	}
};

module.exports.config = {
	name: 'roll',
	description: 'Rolls dice upto 60 times in a row!',
	usage: '[DICE]',
	timeout: 2000,
	accessableby: 'Members',
	category: 'Fun'
};