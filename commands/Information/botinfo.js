const {
	version: djsversion
} = require('discord.js');
const {
	version
} = require('../../package.json');
const {
	utc
} = require('moment');
const os = require('os');
const ms = require('ms');
const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
	try {
		if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please Give The Bot **Embed Links** Permission`);
		}
		const core = os.cpus()[0];
		const embed = new MessageEmbed()
			.setThumbnail(bot.user.displayAvatarURL())
			.setColor('#32cd32')
			.addField('General', [
				`**Client:** ${bot.user.tag} (${bot.user.id})`,
				`**Commands:** ${bot.commands.size}`,
				`**Servers:** ${bot.guilds.cache.size.toLocaleString()}`,
				`**Users:** ${bot.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
				`**Channels:** ${bot.channels.cache.size.toLocaleString()}`,
				`**Creation Date:** ${utc(bot.user.createdTimeStamp).format('Do MMMM YYYY HH:mm:ss')}`,
				`**Node.js Version:** ${process.version}`,
				`**Bot Version:** v${version}`,
				`**Bot Uptime:** ${ms(bot.uptime, { long: false })}`,
				`**Discord.js Version:** v${djsversion}`,
				'\u200b'
			])
			.addField('System', [
				`**Platform:** ${process.platform}`,
				`**Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
				`**CPU:**`,
				`Cores: ${os.cpus().length}`,
				`Model: ${core.model}`,
				`Speed: ${core.speed}Mhz`,
				`**Memory:**`,
				`Total: ${formatBytes(process.memoryUsage().heapTotal)}`,
				`Used: ${formatBytes(process.memoryUsage().heapUsed)}`
			])
			.setTimestamp()
			.setFooter(`${bot.user.username} by FleeffyPawsYT`);
		message.channel.send(embed);
	} catch (err) {
		console.log(err);
		const errembed = new MessageEmbed()
			.setTitle('An error occured')
			.setColor('#FF0000')
			.setDescription(`Error: ${err}. \nPlease report this error to our support server: **[Link](https://discord.gg/CnHEb3h)**`);
		const user = bot.guilds.cache.find('443278070825091072')
		user.send(errembed)
		return message.channel.send(errembed);
	}
};

function formatBytes(bytes) {
	if (bytes === 0) return '0 Bytes';
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}
module.exports.config = {
	name: 'botinfo',
	description: 'Stats Of the bot',
	accessableby: 'Members',
	category: 'Information',
	timeout: 5000,
	aliases: ['botstats', 'botstat', 'bui']
};