const roast = require('roastme');
const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
	try {
		const roaster = roast.random();
		const member = await message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[0]) || args.slice(0).join(' ') ? args.slice(0).join(' ') : message.member;
		if (member.id === '714009112605622332') {
			return message.reply(`🔥 Your dumbass really thought I was going to roast myself?`);
		} else if (member.id === '443278070825091072') {
			return message.reply(`🔥 Your dumbass really thought I was going to roast my owner?`);
		}
		message.channel.send(`${member}, 🔥 ${roaster}`);
	} catch (err) {
		console.log(err);
		const errembed = new MessageEmbed()
			.setTitle('An error occured')
			.setColor('#FF0000')
			.setDescription(`Error: ${err}. \nPlease report this error to our support server: **[Link](https://discord.gg/CnHEb3h)**`);
		const user = bot.users.cache.get('443278070825091072')
		user.send(errembed)
		return message.channel.send(errembed);
	}
};

module.exports.config = {
	name: 'roast',
	description: 'Roasts A mentioned member or the member',
	accessableby: 'Members',
	timeout: 2000,
	usage: '<MEMBER>',
	category: 'Fun'
};