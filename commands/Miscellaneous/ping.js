const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
	if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
		return message.channel.send(`Please Give The Bot **Embed Links** Permission`);
	}
	const pingingEmbed = new MessageEmbed()
		.setColor(`#32cd32`)
		.setTitle('Pinging...');

	const msg = await message.channel.send(pingingEmbed);

	const latency = msg.createdTimestamp - message.createdTimestamp;
	let color;
	if (latency && Math.round(bot.ws.ping) >= 200) {
		color = '#FF0000';
	} else if (latency && Math.round(bot.ws.ping) >= 150) {
		color = '#FFA500';
	} else {
		color = '#32CD32';
	}
	const pingdeEmbed = new MessageEmbed()
		.setTitle('Pong!')
		.addField('Latencies', [`**Bot Latency: \`${latency}ms\`**`, `**API Latency: \`${Math.round(bot.ws.ping)}ms\`**`])
		.setColor(color)
		.setTimestamp()
		.setFooter(`${bot.user.username} by FleeffyPawsYT`);

	msg.edit(pingdeEmbed);

};

module.exports.config = {
	name: 'ping',
	description: 'Shows the latency',
	accessableby: 'Members',
	timeout: 5000,
	category: 'Miscellaneous'
};