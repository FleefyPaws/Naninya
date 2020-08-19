const {
	Client,
	Message,
	MessageEmbed
} = require('discord.js');
let Timeout = new Set()
/**
 * 
 * @param {Client} bot 
 * @param {Message} message
 */
module.exports = async (bot, message) => {
	if (!message.guild || message.author.bot) return;
	const mentionRegex = RegExp(`^<@!${bot.user.id}>$`);

	const prefixhelp = new MessageEmbed()
		.setTitle(`${bot.prefix} is my prefix for the server ${message.guild.name}`)
		.setColor('#32cd32')
		.setFooter(`${bot.user.username} by FleeffyPawsYT`);

	if (message.content.match(mentionRegex)) {
		if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please give the bot **Embed Links** Permission`)
		}
		message.channel.send(prefixhelp);
	}
	if (message.content.toLowerCase().include('cow')) return message.channel.send('NOPE');
	let args = message.content.slice(bot.prefix.length).trim().split(/ +/g);
	let cmd = args.shift().toLowerCase();
	if (!message.content.startsWith(bot.prefix.toLowerCase())) return
	let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
	if (!commandfile) return;
	if (commandfile.config.timeout) {
		if (Timeout.has(`${message.author.id}${commandfile.config.name}`)) {
			return message.reply(`You can only use this command every ${commandfile.config.timeoutname}!`).then(msg => msg.delete({
				timeout: 5000
			}));
		} else {
			if (commandfile) commandfile.run(bot, message, args);
			Timeout.add(`${message.author.id}${commandfile.config.name}`);
			setTimeout(() => {
				Timeout.delete(`${message.author.id}${commandfile.config.name}`);
			}, commandfile.config.timeout);
		}
	} else {
		if (commandfile) commandfile.run(bot, message, args);
	}
}
