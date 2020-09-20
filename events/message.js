const {
	Collection,
	MessageEmbed
} = require('discord.js');

const ms = require('ms');

let Timeout = new Collection();
module.exports = async (bot, message) => {
	// Return if no guild or if user is bot
	if (message.author.bot) return;
	if (message.author.id === '443278070825091072' && message.channel.type === 'dm') {
		if (message.content.toLowerCase() === 'infos') {
			const arr = [`**__Infos__**`, `**Servers:** ${bot.guilds.cache.size.toLocaleString()}`, `**Users:** ${bot.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, `**Channels:** ${bot.channels.cache.size.toLocaleString()}`, `**Bot Uptime:** ${ms(bot.uptime, { long: false })}`, `**__Memory__**`, `**Total**: ${formatBytes(process.memoryUsage().heapTotal)}`, `**Used**: ${formatBytes(process.memoryUsage().heapUsed)}`]
			arr.forEach(each => message.channel.send(each));
			const botinvite = 'https://discord.com/api/oauth2/authorize?client_id=714009112605622332&permissions=1544416374&scope=bot',
				serverinvite = 'https://discord.gg/QTdEFhk';
			message.channel.send(botinvite);
			message.channel.send(serverinvite);
		} else {
			return;
		}
	}
	if (!message.guild) return;
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
		// Run command first
		if (!message.guild.me.hasPermission('SEND_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			console.log(`${message.guild.name} Does not allow me to send messages`)
			return;
		}

		if (!message.guild.me.hasPermission('VIEW_CHANNEL') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			console.log(`${message.guild.name} Does not allow me to send messages`)
			return;
		}
		command.run(bot, message, args)
		// Then Set the timeout
		Timeout.set(`${command.config.name}${message.author.id}`, Date.now() + command.config.timeout);
		// Set a timeout to delete the Cooldown timeout
		setTimeout(() => {
			Timeout.delete(`${command.config.name}${message.author.id}`)
		}, command.config.timeout)
		// Run command
	} else {
		if (!message.guild.me.hasPermission('SEND_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			console.log(`${message.guild.name} Does not allow me to send messages`)
			return;
		}
		if (!message.guild.me.hasPermission('VIEW_CHANNEL') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			console.log(`${message.guild.name} Does not allow me to send messages`)
			return;
		}
		return command.run(bot, message, args);
	}
}

function formatBytes(bytes) {
	if (bytes === 0) return '0 Bytes';
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}