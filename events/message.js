const {
	Collection,
	MessageEmbed
} = require('discord.js');

const ms = require('ms');

let Timeout = new Collection();
module.exports = async (bot, message) => {
	// Return if no guild or if user is bot
	if (message.author.bot || !message.guild) return;
	// Get the prefix mention
	const mentionRegex = RegExp(`^<@!${bot.user.id}>$`);
	// Prefix mention embed
	const prefixhelp = new MessageEmbed()
		.setTitle(`${bot.prefix} is my prefix for the server ${message.guild.name}`)
		.setColor('#32cd32')
		.setTimestamp()
		.setFooter(`${bot.user.username} by FleeffyPawsYT`);
	// If the message content matches ^<@!${bot.user.id}>$
	if (message.content.match(mentionRegex)) {
		if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please give the bot **Embed Links** Permission`)
		} else {
			return message.channel.send(prefixhelp);
		}
	}
	// Command Args
	let args = message.content.slice(bot.prefix.length).trim().split(/ +/g);
	// Command
	let cmd = args.shift().toLowerCase();
	// Usual Things
	if (!message.content.startsWith(bot.prefix.toLowerCase())) return
	let command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
	if (!command) return;
	// Command timeout
	if (command.config.timeout) {
		if (Timeout.has(`${command.config.name}${message.author.id}`)) return message.channel.send(`Please wait ${ms(Timeout.get(`${command.config.name}${message.author.id}`) - Date.now(), { long: true })}`)
		command.run(bot, message, args)
		// Set the timeout
		Timeout.set(`${command.config.name}${message.author.id}`, Date.now() + command.config.timeout);
		// Set a timeout to delete the Cooldown timeout
		setTimeout(() => {
			Timeout.delete(`${command.config.name}${message.author.id}`)
		}, command.config.timeout)
		// Run command
	} else return command.run(bot, message, args);
}