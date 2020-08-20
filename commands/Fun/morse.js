const {
	MessageEmbed
} = require('discord.js');
const morse = require('morse');
module.exports.run = async (bot, message, args) => {
	try {
		const embed = new MessageEmbed()
			.setColor(0xFFFF00);
		var encoded = morse.encode(args.slice(1).join(' '));
		var decoded = morse.decode(args.slice(1).join(' '));
		if (decoded.length > 500) {
			message.delete();
			embed.setDescription('The decoded morse code was too long');
			return message.channel.send(embed);
		}
		if (encoded.length > 500) {
			message.delete();
			embed.setDescription('The encoded morse code was too long');
			return message.channel.send(embed);
		}
		if (!args[0]) {
			message.delete();
			return message.channel.send('Please view the help command for morse');
		}
		if (args[0].toLowerCase() === 'encode') {
			if (!args.slice(1).join(' ')) {
				message.delete();
				return message.channel.send('Please view the help command for morse');
			} else {
				embed.setTitle(`Encoder`);
				embed.setDescription(`
              **Input:\n**\`\`\`${args.slice(1).join(' ')}\`\`\`
              **Output:\n**\`\`\`${encoded}\`\`\``)
					.setFooter(`${bot.config.botname} by ${bot.config.ownername}`);
				message.channel.send(embed);
			}
		}
		if (args[0].toLowerCase() === 'decode') {
			if (!args.slice(1).join(' ')) {
				message.delete();
				return message.channel.send('Please view the help command for morse');
			} else if (args.slice(1).join(' ') >= 1000) {
				message.delete();
				return message.channel.send('Please view the help command for base64');
			} else {
				embed.setTitle(`Decoder`);
				embed.setDescription(`
              **Input:\n**\`\`\`${args.slice(1).join(' ')}\`\`\`
              **Output:\n**\`\`\`${decoded}\`\`\``)
					.setFooter(`${bot.user.username} by FleeffyPawsYT`);
				message.channel.send(embed);
			}
		}
	} catch (err) {
		console.log(err);
		const errembed = new MessageEmbed()
			.setTitle('An error occured')
			.setColor('#FF0000')
			.setDescription(`Error: ${err}. \nPlease report this error to our support server: **https: //discord.gg/s2ezK4X**`);
		return message.channel.send(errembed);
	}
};
module.exports.config = {
	name: 'morse',
	description: 'Encode or decode morse code!',
	usage: '<ENCODE | DECODE> <TEXT>',
	accessableby: 'Members',
	category: 'Fun',
	timeout: 5000,
	timeoutname: '5 seconds'
};
