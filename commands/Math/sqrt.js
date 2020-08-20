const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
	try {
		if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please Give The Bot **Embed Links** Permission`);
		}
		if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please Give The Bot **Manage Messages** Permission`);
		}
		const sqrt = args[0];
		if (!sqrt) {
			message.delete();
			const err1 = new MessageEmbed()
				.setTitle('❌ Please provide the number')
				.setColor('#FF0000');
			return message.channel.send(err1).then(msg => msg.delete({
				timeout: 5000
			}));
		}
		if (isNan(sqrt)) {
			message.delete();
			const err1 = new MessageEmbed()
				.setTitle('❌ Please provide the number')
				.setColor('#FF0000');
			return message.channel.send(err1).then(msg => msg.delete({
				timeout: 5000
			}));
		}
		const embed = new MessageEmbed()
			.setColor('#32cd32')
			.setTitle('Math')
			.addField(`The cuberoot of ${sqrt}:`, `\`\`\`${Math.sqrt(sqrt)}\`\`\``)
			.setTimestamp();

		message.channel.send(embed);
	} catch (err) {
		console.log(err);
		const errembed = new MessageEmbed()
			.setTitle('An error occured')
			.setColor('#FF0000')
			.setDescription(`Error: ${err}. \nPlease report this error to our support server: **https: //discord.gg/s2ezK4X**`);
		message.channel.send(errembed);
	}
};
module.exports.config = {
	name: 'sqrt',
	description: 'Cube Root Of The Given Number',
	usage: '<NUMBER>',
	accessableby: 'Members',
	category: 'Math'
};
