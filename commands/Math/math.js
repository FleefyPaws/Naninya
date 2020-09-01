const {
	MessageEmbed
} = require('discord.js');
const calc = require('mathjs');
module.exports.run = async (bot, message, args) => {
	try {
		if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please Give The Bot **Embed Links** Permission`);
		}
		const math1 = args.slice(0).join(' ');
		if (!math1) {
			message.delete();
			const err1 = new MessageEmbed()
				.setTitle('❌ Please provide the question')
				.setColor('#FF0000');
			return message.channel.send(err1).then(msg => {
				if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) return;
				else msg.delete({
					timeout: 5000
				})
			});
		}
		const resp = calc.evaluate(args.slice(0).join(' '));
		if (resp === undefined) {
			message.delete();
			const err1 = new MessageEmbed()
				.setTitle('❌ Please provide a valid calculation')
				.setColor('#FF0000');
			return message.channel.send(err1).then(msg => {
				if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) return;
				else msg.delete({
					timeout: 5000
				})
			});
		}
		const embed = new MessageEmbed()
			.setColor('#32cd32')
			.setTitle('Math')
			.addField('Input', `\`\`\`js\n${args.slice(0).join(' ')}\`\`\``)
			.addField('Output', `\`\`\`js\n${resp}\`\`\``)
			.setTimestamp();

		message.channel.send(embed);
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
	name: 'math',
	description: 'Displays the addition, multiplication, subtraction and division of 2 numbers',
	usage: '<NUMBER1> <NUMBER2>',
	accessableby: 'Members',
	timeout: 5000,
	category: 'Math'
};