const fetch = require('node-fetch');
const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
	try {
		if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please give the bot **Embed Links** Permission`);
		}
		message.channel.startTyping();
		fetch('https://www.reddit.com/r/memes/random/.json')
			.then(res => res.json()).then(body => {
				const {
					permalink
				} = body[0].data.children[0].data;
				const memeUrl = `https://reddit.com${permalink}`;
				const memeImage = body[0].data.children[0].data.url;
				const memeTitle = body[0].data.children[0].data.title;
				const memeUpvotes = body[0].data.children[0].data.ups;
				const memeNumComments = body[0].data.children[0].data.num_comments;
				const embed = new MessageEmbed()
					.setTitle(`${memeTitle}`)
					.setURL(`${memeUrl}`)
					.setImage(memeImage)
					.setColor('#32cd32')
					.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);
				message.channel.stopTyping();
				return message.channel.send(embed);
			});
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
	name: 'meme',
	description: 'Summons a meme picture',
	accessableby: 'Members',
	category: 'Image',
	timeout: 5000,
	aliases: ['memes', 'memey']
};