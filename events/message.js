const {
	Client,
	Message,
	MessageEmbed
} = require('discord.js');
let Timeout = new Collection()
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
		} else {
			message.channel.send(prefixhelp);
		}
	}
	let args = message.content.slice(bot.prefix.length).trim().split(/ +/g);
	let cmd = args.shift().toLowerCase();
	if (!message.content.startsWith(bot.prefix.toLowerCase())) return
	let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
	if (!commandfile) return;
	if (commandfile.config.timeout) {
        if (command.timeout) {
        	if (Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`Please wait ${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), { long: false })}`)
         	command.run(bot, message, args)
            	Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout);
         	setTimeout(() => {
                	Timeout.delete(`${command.config.name}${message.author.id}`)
            	}, command.config.timeout)
        } else return command.run(bot, message, args);
    }
}
