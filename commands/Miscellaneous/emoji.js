const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
	let Emojis = '';
	let EmojisAnimated = '';
	let EmojiCount = 0;
	let Animated = 0;
	let OverallEmojis = 0;
	if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
		return message.channel.send(`Please Give The Bot **Embed Links** Permission`);
	}

	function Emoji(id) {
		return bot.emojis.cache.get(id).toString();
	}
	message.guild.emojis.cache.forEach((emoji) => {
		OverallEmojis++;
		if (emoji.animated) {
			Animated++;
			EmojisAnimated += Emoji(emoji.id);
		} else {
			EmojiCount++;
			Emojis += Emoji(emoji.id);
		}
	});
	const Embed = new MessageEmbed()
		.setTitle(`Emojis in ${message.guild.name}.`)
		.setDescription(`**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}\n\n**Over all emojis [${OverallEmojis}]**`)
		.setColor(`RANDOM`)
		.setFooter(`${bot.user.username} by FleeffyPawsYT`);
	message.channel.send(Embed);

};

module.exports.config = {
	name: 'emoji',
	description: 'Views all the emoji in the server',
	accessableby: 'Member',
	timeout: 5000,
	category: 'Miscellaneous'
};