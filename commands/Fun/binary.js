const {
	MessageEmbed
} = require('discord.js');
const fetch = require('node-fetch');
module.exports.run = async (bot, message, args) => {
	try {
		if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please give the bot **Embed Links** Permission`);
		}
		if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please give the bot **Manage Messages** Permission`);
		}
		if (!args[0]) {
			message.delete();
			const nopermembed = new MessageEmbed()
				.setTitle('❌ Please say if you need to decode or encode')
				.setColor('#FF0000');
			return message.channel.send(nopermembed);
		}
		if (args[0].toLowerCase() === 'encode') {
			if (!args.slice(0).join(' ')) {
				message.delete();
				const nopermembed = new MessageEmbed()
					.setTitle('❌ Please provide a string to encode')
					.setColor('#FF0000');
				return message.channel.send(nopermembed).then(msg => msg.delete({
					timeout: 5000
				}));
			} else if (args.slice(1).join(' ') >= 1000) {
				message.delete();
				const nopermembed = new MessageEmbed()
					.setTitle('❌ Cannot encode more than 1000 characters')
					.setColor('#FF0000');
				return message.channel.send(nopermembed).then(msg => msg.delete({
					timeout: 5000
				}));
			} else {
				fetch(`https://some-random-api.ml/binary/?text=${args.slice(1).join(' ')}`).then(res => res.json()).then(body => {
					if (!body) return message.channel.send('Sorry i\'v broke!');
					const embed = new MessageEmbed()
						.setColor('#32CD32')
						.setTitle(`Encoder`)
						.setDescription(`
            **Input:\n**\`\`\`${args.slice(1).join(' ')}\`\`\`
            **Output:\n**\`\`\`${body.binary}\`\`\``)
						.setFooter(`${bot.user.username} by FleeffyPawsYT`);
					message.channel.send(embed);
				});
			}
		}
		if (args[0].toLowerCase() === 'decode') {
			if (!args.slice(1).join(' ')) {
				message.delete();
				const nopermembed = new MessageEmbed()
					.setTitle('❌ Please provide a string to decode')
					.setColor('#FF0000');
				return message.channel.send(nopermembed).then(msg => msg.delete({
					timeout: 5000
				}));
			} else if (args.slice(1).join(' ') >= 1000) {
				message.delete();
				const nopermembed = new MessageEmbed()
					.setTitle('❌ Cannot decode more than 1000 characters')
					.setColor('#FF0000');
				return message.channel.send(nopermembed).then(msg => msg.delete({
					timeout: 5000
				}));
			} else {
				fetch(`https://some-random-api.ml/binary/?decode=${args.slice(1).join(' ')}`).then(res => res.json()).then(body => {
					if (!body) return message.channel.send('Sorry i\'v broke!');
					const embed = new MessageEmbed()
						.setColor('#32cd32')
						.setTitle(`Decoder`)
						.setDescription(`
            **Input:\n**\`\`\`${args.slice(1).join(' ')}\`\`\`
            **Output:\n**\`\`\`${body.text}\`\`\``)
						.setFooter(`${bot.user.username} by FleeffyPawsYT`);
					message.channel.send(embed);
				});
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
	name: 'binary',
	description: 'Encode or decode binary!',
	usage: '<ENCODE | DECODE> <TEXT>',
	accessableby: 'Members',
	category: 'Fun',
	timeout: 5000,
	timeoutname: '5 seconds'
};
